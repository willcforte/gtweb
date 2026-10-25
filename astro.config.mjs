import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import rehypeColocate from './src/plugins/rehype-colocate.mjs';

export default defineConfig({
    markdown: {
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [[rehypeKatex, { output: 'html' }], rehypeColocate],
        }),
    },
    vite: {
        plugins: [
            viteStaticCopy({
                targets: [{ src: ['content/**/*', '!content/**/*.md'], dest: '.', rename: { stripBase: 1 } }],
            }),
        ],
    },
});
