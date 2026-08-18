import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import {
    rehypeDocumentTitle,
    rehypeFigure,
    rehypeEmbed,
    rehypeExternalLinks,
} from './src/plugins/rehype-enhance.mjs'

export default defineConfig({
    site: 'https://willcforte.com',
    output: 'static',
    integrations: [mdx(), sitemap()],
    markdown: {
        /*
         * Order matters: the title reconciliation before slugs so a demoted
         * heading is anchored as the h2 it became, slugs before autolinks, and
         * the figure/embed rewrites after KaTeX so they only ever see real
         * content nodes.
         */
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [
                [rehypeKatex, { output: 'html' }],
                rehypeDocumentTitle,
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: 'append',
                        properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
                        content: { type: 'text', value: '#' },
                        test: ['h2', 'h3', 'h4'],
                    },
                ],
                rehypeFigure,
                rehypeEmbed,
                rehypeExternalLinks,
            ],
            /* SmartyPants is on by default: real quotes, en/em dashes, ellipses. */
        }),
        shikiConfig: { theme: 'github-light', wrap: true },
    },
    image: {
        responsiveStyles: true,
        layout: 'constrained',
    },
})
