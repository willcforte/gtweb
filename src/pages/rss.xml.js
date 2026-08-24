import rss from '@astrojs/rss'
import { SITE } from '../consts'
import { allPosts, postUrl } from '../utils/posts'

export async function GET(context) {
    const posts = await allPosts()

    return rss({
        title: `${SITE.title} — GTWeb`,
        description: SITE.description,
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description ?? post.data.title,
            pubDate: post.data.date,
            link: postUrl(post),
            customData: '<language>en-us</language>',
        })),
    })
}
