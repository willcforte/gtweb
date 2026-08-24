/*
 * Post-build check: every internal link and every redirect destination must
 * resolve to something that actually exists in dist/.
 *
 * Vercel applies the redirect table itself, so the local guarantee is narrower
 * but still the useful one: no rule points at a page that was never built.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

if (!existsSync(dist)) {
    console.error('dist/ not found — run the build first')
    process.exit(1)
}

function walk(dir) {
    const out = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) out.push(...walk(path))
        else if (entry.name.endsWith('.html')) out.push(path)
    }
    return out
}

/** A path resolves if it is a file, or a directory holding index.html. */
function resolves(urlPath) {
    const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0])
    if (clean === '/') return existsSync(join(dist, 'index.html'))

    const target = join(dist, clean)
    if (existsSync(target)) {
        return statSync(target).isDirectory()
            ? existsSync(join(target, 'index.html'))
            : true
    }
    return existsSync(`${target}.html`) || existsSync(join(`${target}`, 'index.html'))
}

const pages = walk(dist)
const broken = []
let checked = 0

for (const page of pages) {
    const html = readFileSync(page, 'utf8')
    const from = page.replace(dist, '') || '/'

    for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
        const target = match[1]
        if (target.startsWith('//')) continue
        checked++
        if (!resolves(target)) broken.push({ from, target })
    }
}

/* Redirect destinations must exist too, or the 301 lands on a 404. */
const vercel = join(root, 'vercel.json')
let redirectProblems = []
if (existsSync(vercel)) {
    const { redirects = [] } = JSON.parse(readFileSync(vercel, 'utf8'))
    redirectProblems = redirects.filter((r) => !resolves(r.destination))
    console.log(`checked ${redirects.length} redirect destinations`)
}

console.log(`checked ${checked} internal links across ${pages.length} pages`)

if (broken.length) {
    console.error(`\n${broken.length} broken internal link(s):`)
    for (const b of broken.slice(0, 40)) console.error(`  ${b.from} -> ${b.target}`)
}

if (redirectProblems.length) {
    console.error(`\n${redirectProblems.length} redirect(s) pointing nowhere:`)
    for (const r of redirectProblems) console.error(`  ${r.source} -> ${r.destination}`)
}

if (broken.length || redirectProblems.length) process.exit(1)
console.log('all internal links and redirect destinations resolve')
