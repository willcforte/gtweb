/*
 * One-off source-image pass.
 *
 * Two separate problems:
 *
 *  1. Photographs were committed straight off the camera (up to 6.2MB, 5184px
 *     wide). Nothing on the site displays them above ~1600px, so they are
 *     downscaled in place to a sane maximum and re-encoded.
 *
 *  2. Animated GIFs must not go through Astro's image pipeline at all: it
 *     treats them as stills and emits one multi-megabyte WebP per width. They
 *     are converted to animated WebP and moved to public/media/, which Astro
 *     copies verbatim.
 *
 * The full-resolution originals remain recoverable from git history under the
 * old `content/` directory.
 */
import { readdirSync, statSync, renameSync, mkdirSync, existsSync, unlinkSync } from 'node:fs'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'src/content/posts')
const publicMedia = join(root, 'public/media')

const MAX_WIDTH = 1800
const STILL = new Set(['.jpg', '.jpeg', '.png'])

const kb = (n) => `${Math.round(n / 1024)}KB`

function walk(dir) {
    const out = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) out.push(...walk(path))
        else out.push(path)
    }
    return out
}

const files = walk(postsDir)
let savedStill = 0
let savedGif = 0

/* --- 1. Downscale oversized stills in place --- */
for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!STILL.has(ext)) continue

    const before = statSync(file).size
    const image = sharp(file, { failOn: 'none' })
    const { width } = await image.metadata()
    if (!width) continue

    const needsResize = width > MAX_WIDTH
    if (!needsResize && before < 600 * 1024) continue

    const pipeline = sharp(file, { failOn: 'none' }).rotate()
    if (needsResize) pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })

    const buffer = await (ext === '.png'
        ? pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
        : pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer())

    if (buffer.length >= before) {
        console.log(`  skip   ${basename(file)} (re-encode was larger)`)
        continue
    }

    const { writeFileSync } = await import('node:fs')
    writeFileSync(file, buffer)
    savedStill += before - buffer.length
    console.log(`  still  ${basename(file)}  ${kb(before)} -> ${kb(buffer.length)}`)
}

/* --- 2. Animated GIFs become animated WebP under public/media/ --- */
if (!existsSync(publicMedia)) mkdirSync(publicMedia, { recursive: true })

for (const file of files) {
    if (extname(file).toLowerCase() !== '.gif') continue

    const before = statSync(file).size
    const name = `${basename(file, extname(file))}.webp`
    const target = join(publicMedia, name)

    await sharp(file, { animated: true, failOn: 'none' })
        .webp({ quality: 65, effort: 5 })
        .toFile(target)

    const after = statSync(target).size
    savedGif += before - after
    unlinkSync(file)
    console.log(`  anim   ${basename(file)}  ${kb(before)} -> public/media/${name} ${kb(after)}`)
}

console.log(`\nstills saved ${kb(savedStill)}, animations saved ${kb(savedGif)}`)
console.log('Update Markdown references for moved animations to /media/<name>.webp')
