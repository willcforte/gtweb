/*
 * Fills in a missing `date` so writing a post never requires typing one.
 *
 * `npm run new` already stamps today's date. This covers the other case: a
 * file dropped into src/content/posts/ by hand. The date is written back into
 * the file rather than resolved at render time, so it is fixed once and cannot
 * drift on a later build.
 *
 * Runs before `astro build` (see the `build` script in package.json).
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = join(root, 'src/content/posts')

/* Local calendar date. toISOString would report tomorrow for an evening write. */
const localDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** When the file first entered git, which is the closest thing to "when I wrote it". */
function firstCommitDate(file) {
    try {
        const out = execFileSync(
            'git',
            ['log', '--follow', '--diff-filter=A', '--format=%aI', '--', file],
            { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
        )
        return out.trim().split('\n').filter(Boolean).pop()
    } catch {
        return undefined
    }
}

let stamped = 0

for (const entry of readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const file = join(postsDir, entry.name, 'index.md')
    if (!existsSync(file)) continue

    const body = readFileSync(file, 'utf8')
    const end = body.indexOf('\n---', 4)
    if (!body.startsWith('---') || end === -1) continue
    if (/^date:/m.test(body.slice(0, end))) continue

    const date = firstCommitDate(file)?.slice(0, 10) ?? localDate(statSync(file).mtime)
    writeFileSync(file, `${body.slice(0, end)}\ndate: ${date}${body.slice(end)}`)
    console.log(`[dates] ${entry.name} -> ${date}`)
    stamped += 1
}

console.log(stamped ? `[dates] stamped ${stamped} post(s)` : '[dates] every post already dated')
