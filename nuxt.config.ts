// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-content-assets',
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
        '@/assets/css/tailwind.scss',
    ],
    vite: {
        server: {
            fs: {
                allow: ["../../../node_modules"]
            },
        },
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",},
                {rel: "stylesheet", href: "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",},      
            ],
        },
    },
    // image: {
    //     dir: '@/assets/img',
    // },
})
