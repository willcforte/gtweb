import { visit } from 'unist-util-visit'

/*
 * These run at the rehype stage, after Astro has already rewritten and optimised
 * `<img>` sources. Running them earlier (in remark) would bypass that pipeline.
 *
 * The point of both plugins is that plain CommonMark is enough: an image on its
 * own line becomes a captioned figure, and a bare video URL becomes an embed,
 * with no component syntax and no raw HTML in the Markdown.
 */

const isBlank = (n) => n.type === 'text' && n.value.trim() === ''
const soleChild = (node) => {
    const kids = node.children.filter((c) => !isBlank(c))
    return kids.length === 1 ? kids[0] : null
}

/** `![Caption](img.png)` alone in a paragraph -> <figure> + <figcaption>. */
export function rehypeFigure() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (!parent || index === null || node.tagName !== 'p') return

            const img = soleChild(node)
            if (!img || img.type !== 'element' || img.tagName !== 'img') return

            const alt = String(img.properties?.alt ?? '').trim()
            const children = [img]

            if (alt) {
                children.push({
                    type: 'element',
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text', value: alt }],
                })
            }

            parent.children[index] = {
                type: 'element',
                tagName: 'figure',
                properties: {},
                children,
            }
        })
    }
}

const YOUTUBE =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{11})/

/** A bare YouTube URL alone in a paragraph -> lazy, aspect-correct embed. */
export function rehypeEmbed() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (!parent || index === null || node.tagName !== 'p') return

            const link = soleChild(node)
            if (!link || link.type !== 'element' || link.tagName !== 'a') return

            const href = String(link.properties?.href ?? '')
            const match = href.match(YOUTUBE)
            if (!match) return

            parent.children[index] = {
                type: 'element',
                tagName: 'div',
                properties: { className: ['embed'] },
                children: [
                    {
                        type: 'element',
                        tagName: 'iframe',
                        properties: {
                            src: `https://www.youtube-nocookie.com/embed/${match[1]}`,
                            title: 'Embedded video',
                            loading: 'lazy',
                            allow: 'accelerometer; clipboard-write; encrypted-media; picture-in-picture',
                            allowFullscreen: true,
                            frameBorder: '0',
                        },
                        children: [],
                    },
                ],
            }
        })
    }
}

/** Outbound links open safely and are marked for styling. */
export function rehypeExternalLinks() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName !== 'a') return

            const href = String(node.properties?.href ?? '')
            if (!/^https?:\/\//.test(href)) return
            if (href.includes('willcforte.com')) return

            node.properties.rel = 'noopener noreferrer'
            node.properties.className = [
                ...(node.properties.className ?? []),
                'external',
            ]
        })
    }
}
