/*
 * Generates vercel.json from the `legacyPath` field on every post.
 *
 * Each migrated file records where it lived on the Nuxt site, so the 301 table
 * is derived from content rather than hand-maintained. Adding a `legacyPath`
 * entry to a post is the only step needed to preserve an old URL.
 *
 * Runs before `astro build` (see the `build` script in package.json).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'src/content/posts')

/* Old section indexes fold into the new filtered views. */
const SECTION_REDIRECTS = [
    ['/articles', '/writing'],
    ['/robotics', '/projects'],
    ['/self-study', '/notes'],
    ['/self-study/courses', '/notes'],
    ['/feed.rss', '/rss.xml'],
    /* An empty lecture stub that no longer exists; its series index replaces it. */
    ['/self-study/courses/uar/lectn', '/posts/uar/'],
]

function collectPostRedirects() {
    const redirects = []

    for (const slug of readdirSync(postsDir, { withFileTypes: true })) {
        if (!slug.isDirectory()) continue

        const file = join(postsDir, slug.name, 'index.md')
        if (!existsSync(file)) continue

        const { data } = matter(readFileSync(file, 'utf8'))
        for (const source of data.legacyPath ?? []) {
            redirects.push({ source, destination: `/posts/${slug.name}/` })
        }
    }

    return redirects
}

const all = [
    ...collectPostRedirects(),
    ...SECTION_REDIRECTS.map(([source, destination]) => ({ source, destination })),
]

/* A duplicate source would silently shadow one of the two rules. Fail loudly. */
const seen = new Map()
for (const r of all) {
    if (seen.has(r.source)) {
        console.error(
            `[redirects] duplicate legacyPath "${r.source}" -> ${seen.get(r.source)} and ${r.destination}`,
        )
        process.exit(1)
    }
    seen.set(r.source, r.destination)
}

const config = {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    trailingSlash: true,
    redirects: all
        .sort((a, b) => a.source.localeCompare(b.source))
        .map((r) => ({ ...r, permanent: true })),
}

writeFileSync(join(root, 'vercel.json'), `${JSON.stringify(config, null, 2)}\n`)
console.log(`[redirects] wrote ${all.length} permanent redirects to vercel.json`)
