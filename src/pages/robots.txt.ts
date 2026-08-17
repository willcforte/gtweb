import type { APIRoute } from 'astro'

const body = `User-agent: *
Allow: /

Sitemap: https://willcforte.com/sitemap-index.xml
`

export const GET: APIRoute = () => {
    return new Response(body, {
        headers: { 'Content-Type': 'text/plain' },
    })
}
