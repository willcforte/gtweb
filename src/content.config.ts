import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const content = defineCollection({
    loader: glob({ base: './content', pattern: '**/[^_]*.md' }),
    schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        unix: z.string().optional(),
        bytes: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
        show: z.boolean().optional(),
        long_description: z.string().optional(),
        img_path: z.string().optional(),
        img_alt: z.string().optional(),
        image: z.string().optional(),
    }),
});

export const collections = { content };
