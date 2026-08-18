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

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${W}" height="18" fill="${BLACK}"/>
  <rect x="0" y="${H - 18}" width="${W}" height="18" fill="${GREEN}"/>
  <text x="90" y="140" font-family="${FONT}" font-size="30" font-weight="bold"
        fill="${GREEN}" letter-spacing="4">${escape(eyebrow.toUpperCase())}</text>
  <text font-family="${FONT}" font-size="${titleSize}" font-weight="bold" fill="${BLACK}">${tspans}</text>
  <text x="90" y="${H - 70}" font-family="${FONT}" font-size="28" fill="${MUTED}">${escape(footer)}</text>
  <text x="${W - 90}" y="${H - 70}" font-family="${FONT}" font-size="32" font-weight="bold"
        fill="${BLACK}" text-anchor="end">/GTWeb</text>
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

await render(
    card({
        title: 'Will C. Forte',
        eyebrow: 'robotics',
        footer: 'willcforte.com',
    }),
    join(root, 'public/og-default.png'),
)

console.log(`[og] generated ${count} post cards + og-default.png`)
