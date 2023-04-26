// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content'
    ],
    content: {
        markdown: {
            remarkPlugins: [
                'remark-math',
            ],
            rehypePlugins: [
                ['rehype-katex', { output: 'html' }],
            ],
        },
    },
    css: [
        '@/assets/css/main.scss',
        // '@/assets/css/latex.scss',
        '@/assets/css/katex.scss',
    ],
})
