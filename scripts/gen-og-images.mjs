/*
 * Builds a branded Open Graph card per post, plus a site-wide default.
 *
 * Rendered as SVG and rasterised with sharp. Text is set in a monospace system
 * face rather than Iosevka: Fontsource ships web formats that librsvg will not
 * load, and a card that renders reliably everywhere beats an exact type match.
 *
 * Runs before `astro build` (see the `build` script in package.json).
 */
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'src/content/posts')
const outDir = join(root, 'public/og')

const W = 1200
const H = 630
const CREAM = '#e3ceae'
const BLACK = '#000000'
const GREEN = '#064d2a'
const MUTED = '#333131'
const FONT = 'DejaVu Sans Mono, Liberation Mono, monospace'

const escape = (s) =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

/* Monospace makes a character-count wrap accurate enough to avoid measuring. */
function wrap(text, maxChars, maxLines) {
    const words = String(text).split(/\s+/)
    const lines = []
    let line = ''

    for (const word of words) {
        const candidate = line ? `${line} ${word}` : word
        if (candidate.length <= maxChars) {
            line = candidate
        } else {
            if (line) lines.push(line)
            line = word
        }
        if (lines.length === maxLines) break
    }
    if (line && lines.length < maxLines) lines.push(line)

    if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
        lines[maxLines - 1] = `${lines[maxLines - 1].replace(/.{1}$/, '')}…`
    }
    return lines
}

/* DejaVu Sans Mono advances 0.602em per glyph, so the usable line length is exact. */
const PAD = 90
const ADVANCE = 0.602
const CAP = 0.729

/*
 * The wcf wordmark, taken from the brand SVG so the asset stays the one source
 * of truth. Its own fills live in a <style> block that librsvg ignores, so the
 * colours are reapplied here as presentation attributes.
 *
 * Within the 370x200 artboard the letterforms occupy a 294.03x150.81 box at
 * (38.52, 24.72); those constants place and scale the lockup exactly.
 */
const BOX_W = 370
const BOX_H = 200
const INK_TOP = 24.72 / BOX_H
const INK_H = 150.81 / BOX_H

const glyphs = readFileSync(join(root, 'src/assets/img/brand/wcf_rast_c.svg'), 'utf8')
    .match(/<path[^>]*\sd="[^"]+"/g)
    .map((tag) => tag.match(/\sd="([^"]+)"/)[1])

/** The wcf mark beside "/GTWeb", set so both share a baseline and cap height. */
function lockup(baselineY, inkHeight) {
    const boxH = inkHeight / INK_H
    const boxW = (BOX_W / BOX_H) * boxH
    const scale = boxH / BOX_H
    const boxTop = baselineY - (INK_TOP + INK_H) * boxH

    const size = inkHeight / CAP
    const gap = boxH * 0.09
    const width = boxW + gap + '/GTWeb'.length * ADVANCE * size

    const svg = `<g transform="translate(0 ${boxTop}) scale(${scale})">
    <rect width="${BOX_W}" height="${BOX_H}" fill="${BLACK}"/>
    ${glyphs.map((d) => `<path fill="${CREAM}" d="${d}"/>`).join('\n    ')}
  </g>
  <text x="${boxW + gap}" y="${baselineY}" font-family="${FONT}" font-size="${size}"
        font-weight="bold" fill="${BLACK}">/GTWeb</text>`

    return { svg, width }
}

function card({ title, eyebrow, footer }) {
    const titleSize = title.length > 60 ? 52 : 64
    const maxChars = Math.floor((W - PAD * 2) / (titleSize * ADVANCE))
    const lines = wrap(title, maxChars, 4)
    const lineHeight = titleSize * 1.22

    /* Centre the title block in the space between the eyebrow and the footer. */
    const startY = 200 + (330 - lines.length * lineHeight) / 2 + titleSize * 0.8

    const tspans = lines
        .map(
            (line, i) =>
                `<tspan x="${PAD}" y="${startY + i * lineHeight}">${escape(line)}</tspan>`,
        )
        .join('')

    const mark = lockup(H - 62, 26)

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${W}" height="18" fill="${BLACK}"/>
  <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${GREEN}"/>
  <text x="90" y="140" font-family="${FONT}" font-size="30" font-weight="bold"
        fill="${GREEN}" letter-spacing="4">${escape(eyebrow.toUpperCase())}</text>
  <text font-family="${FONT}" font-size="${titleSize}" font-weight="bold" fill="${BLACK}">${tspans}</text>
  <text x="90" y="${H - 70}" font-family="${FONT}" font-size="28" fill="${MUTED}">${escape(footer)}</text>
  <g transform="translate(${W - PAD - mark.width} 0)">${mark.svg}</g>
</svg>`
}

/* The fallback card for every page that is not a post: the wordmark, large. */
function defaultCard() {
    const mark = lockup(282, 74)

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${W}" height="18" fill="${BLACK}"/>
  <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${GREEN}"/>
  <g transform="translate(${(W - mark.width) / 2} 0)">${mark.svg}</g>
  <text x="${W / 2}" y="382" font-family="${FONT}" font-size="46" font-weight="bold"
        fill="${BLACK}" text-anchor="middle">Will C. Forte</text>
  <text x="${W / 2}" y="442" font-family="${FONT}" font-size="28"
        fill="${MUTED}" text-anchor="middle">robotics engineering, research, and writing</text>
</svg>`
}

const render = (svg, file) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file)

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

let count = 0
for (const entry of readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const file = join(postsDir, entry.name, 'index.md')
    if (!existsSync(file)) continue

    const { data } = matter(readFileSync(file, 'utf8'))
    const date = new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    })

    await render(
        card({ title: data.title, eyebrow: data.type, footer: date }),
        join(outDir, `${entry.name}.png`),
    )
    count++
}

await render(defaultCard(), join(root, 'public/og-default.png'))

console.log(`[og] generated ${count} post cards + og-default.png`)
