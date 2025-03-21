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
            anchorLinks: {
                depth: 3,
            },
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
                {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",},
                {rel: "stylesheet", href: "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",},
                {rel: "preload", href: "~/assets/img/wcf_rast_c.svg", as: "image"},
            ],
        },
    },
    // image: {
    //     dir: '@/assets/img',
    // },'
    nitro: {
        routeRules: {
            // '/content/research/**': { headers: { 'Content-Type': 'application/pdf' } },
            '/public/**': { headers: { 'Content-Type': 'application/pdf' } },
        },
    },
})
