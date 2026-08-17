import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/*
 * One stream. `type` decides which index a post appears in, resolved by a
 * mechanical question rather than a judgement call:
 *
 *   Did I build an artifact?                  -> project
 *   Notes taken from someone else's material? -> note  (requires `source`)
 *   Reporting what I did or what happened?    -> log
 *   Arguing a position?                       -> essay
 *
 * Only `note` carries a hard requirement, because citing the source is what
 * makes it a note rather than a log. `series` stays optional everywhere so that
 * writing a one-off never means inventing a thread to put it in.
 */
const POST_TYPES = ['project', 'essay', 'log', 'note'] as const

const posts = defineCollection({
    loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z
            .object({
                title: z.string().min(1),
                description: z.string().min(1),
                type: z.enum(POST_TYPES),
                date: z.coerce.date(),
                updated: z.coerce.date().optional(),
                tags: z.array(z.string()).default([]),

                /* `log` groups into a thread; `note` cites what it came from. */
                series: z.string().optional(),
                source: z.string().optional(),

                hero: image().optional(),
                heroAlt: z.string().optional(),

                status: z.enum(['wip', 'done', 'archived']).default('done'),
                draft: z.boolean().default(false),

                /* Where this lived on the Nuxt site. Drives the 301s in vercel.json. */
                legacyPath: z.array(z.string()).default([]),
            })
            .refine((d) => d.type !== 'note' || Boolean(d.source), {
                message: "type 'note' requires a `source` (what you took notes from)",
                path: ['source'],
            })
            .refine((d) => !d.hero || Boolean(d.heroAlt), {
                message: '`hero` requires `heroAlt`',
                path: ['heroAlt'],
            }),
})

export const collections = { posts }
