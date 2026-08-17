/*
 * Scaffolds a post with valid frontmatter and today's date.
 *
 *   npm run new -- "Title of the post"
 *   npm run new -- "Lecture 3" --type=note --source="MIT 6.832" --series=uar
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const TYPES = ['project', 'essay', 'log', 'note']

const args = process.argv.slice(2)
const flags = Object.fromEntries(
    args
        .filter((a) => a.startsWith('--'))
        .map((a) => {
            const [k, ...v] = a.replace(/^--/, '').split('=')
            return [k, v.join('=')]
        }),
)
const title = args.find((a) => !a.startsWith('--'))

if (!title) {
    console.error('usage: npm run new -- "Title of the post" [--type=essay] [--source=...] [--series=...]')
    process.exit(1)
}

const type = flags.type ?? 'essay'
if (!TYPES.includes(type)) {
    console.error(`--type must be one of: ${TYPES.join(', ')}`)
    process.exit(1)
}
if (type === 'note' && !flags.source) {
    console.error('a note needs --source="what you took notes from"')
    process.exit(1)
}

const slug =
    flags.slug ??
    title
        .toLowerCase()
        .replace(/['']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

const dir = join(root, 'src/content/posts', slug)
if (existsSync(dir)) {
    console.error(`already exists: src/content/posts/${slug}/`)
    process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)
const lines = [
    '---',
    `title: ${JSON.stringify(title)}`,
    /* A real placeholder, not an empty string: the schema rejects empty, and a
       scaffold that breaks the dev server on creation is a bad way to start. */
    'description: "TODO — one sentence, shown in listings and link previews."',
    `type: ${type}`,
    `date: ${today}`,
    'tags: []',
]
if (flags.series) lines.push(`series: ${flags.series}`)
if (flags.source) lines.push(`source: ${JSON.stringify(flags.source)}`)
lines.push('status: wip', 'draft: true', '---', '', '')

mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, 'index.md'), lines.join('\n'))

console.log(`created src/content/posts/${slug}/index.md`)
console.log('fill in `description`, then set `draft: false` when ready to publish')
