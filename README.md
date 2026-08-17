# GTWeb — willcforte.com

Personal site for robotics projects, research, and writing. Built with [Astro](https://astro.build);
content is plain Markdown.

## Quickstart

```sh
npm install
npm run dev      # local dev server
npm run build    # generates redirects + OG cards, then builds to dist/
npm run verify   # build, then check every internal link and redirect resolves
```

Requires Node 20+.

## Writing a post

Create `src/content/posts/<slug>/index.md`. Images go in the same folder and are referenced
relatively (`![Caption](./photo.jpg)`) so they get resized and converted at build time.

```yaml
---
title: Title of the post
description: One sentence, used in listings, search results, and link previews.
type: essay          # project | essay | log | note
date: 2026-08-16
tags: [robotics, hardware]
---
```

Which `type`? The question is mechanical:

| Ask | `type` | Appears under |
| --- | --- | --- |
| Did I build an artifact? | `project` | `/projects` |
| Are these notes from someone else's material? | `note` (needs `source`) | `/notes` |
| Am I reporting what I did or what happened? | `log` | `/writing` |
| Am I arguing a position? | `essay` | `/writing` |

Optional: `series` groups related posts and generates prev/next links. `draft: true` hides a post
from production builds. `status: wip` marks it as unfinished. `hero` sets a lead image and requires
`heroAlt`. `legacyPath` lists old URLs to redirect from.

The frontmatter schema is enforced by Zod in `src/content.config.ts` — **an invalid post fails the
build** rather than shipping broken.

## Plain Markdown is enough

There is no custom component syntax. The build enhances ordinary CommonMark:

- an image alone in a paragraph becomes a captioned `<figure>`
- a bare YouTube URL alone in a paragraph becomes a lazy embed
- `$math$` and `$$display math$$` render via KaTeX
- headings get anchor links; long posts get a table of contents
- external links get `rel="noopener"`

Reading time, RSS, the sitemap, tag pages, `/archive`, and per-post link-preview images are all
generated. Nothing about a post is maintained by hand except its prose.

## Layout

```
src/content/posts/   the writing — one folder per post
src/pages/           routes; listings are filtered views of the one post collection
src/components/      shared UI
src/layouts/         page shells
src/styles/          design tokens, type scale, and the prose typesetting layer
src/plugins/         Markdown auto-enhancement
scripts/             redirect table, OG cards, link checker
```

## Deployment

Deploys to Vercel as a static site. `vercel.json` is **generated** by `scripts/gen-redirects.mjs`
from each post's `legacyPath` — edit the frontmatter, not the JSON.

## Comments

Giscus, on `/writing` posts. Needs Discussions enabled on this repo, the Giscus app installed, and
`repoId` / `categoryId` filled into `src/consts.ts`. Until then it renders nothing.
