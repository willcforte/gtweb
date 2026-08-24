import { getCollection, type CollectionEntry } from 'astro:content'
import readingTime from 'reading-time'

export type Post = CollectionEntry<'posts'>
export type PostType = Post['data']['type']

/** Drafts are visible while developing and hidden in production builds. */
const visible = ({ data }: Post) => import.meta.env.PROD === false || !data.draft

const byNewest = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf()

export async function allPosts(): Promise<Post[]> {
    const posts = await getCollection('posts', visible)
    return posts.sort(byNewest)
}

export async function postsOfType(...types: PostType[]): Promise<Post[]> {
    const posts = await allPosts()
    return posts.filter((p) => types.includes(p.data.type))
}

/** `/writing` collects the things Will wrote himself; `/notes` is sourced material. */
export const writingTypes: PostType[] = ['essay', 'log']

export function postUrl(post: Post): string {
    return `/posts/${post.id}/`
}

export function tagUrl(tag: string): string {
    return `/tags/${tag}/`
}

export function readTime(post: Post): string {
    return readingTime(post.body ?? '').text
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    })
}

export function formatDateShort(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        timeZone: 'UTC',
    })
}

export async function allTags(): Promise<{ tag: string; count: number }[]> {
    const posts = await allPosts()
    const counts = new Map<string, number>()

    for (const post of posts) {
        for (const tag of post.data.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1)
        }
    }

    return [...counts.entries()]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/** Sibling entries in the same `series`, oldest first, for prev/next links. */
export async function seriesSiblings(post: Post): Promise<Post[]> {
    if (!post.data.series) return []
    const posts = await allPosts()
    return posts
        .filter((p) => p.data.series === post.data.series)
        .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
}

/** Posts sharing the most tags, used for the "related" footer. */
export async function relatedPosts(post: Post, limit = 3): Promise<Post[]> {
    const posts = await allPosts()
    const tags = new Set(post.data.tags)

    return posts
        .filter((p) => p.id !== post.id)
        .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score || byNewest(a.p, b.p))
        .slice(0, limit)
        .map((x) => x.p)
}

/** Every legacy URL -> its new home. Feeds the 301 table in vercel.json. */
export async function legacyRedirects(): Promise<{ source: string; destination: string }[]> {
    const posts = await getCollection('posts')
    return posts.flatMap((p) =>
        p.data.legacyPath.map((source) => ({ source, destination: postUrl(p) })),
    )
}
