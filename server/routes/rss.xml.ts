import { serverQueryContent } from '#content/server'
import RSS from 'rss'

const feed = new RSS({
  title: 'Will C. Forte | Blog',
  site_url: 'https://willcforte.com',
  feed_url: `https://willcforte.com/rss.xml`,
})

const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
const blogPosts = docs.filter((doc) => doc?._path?.includes('/blog'))

for (const doc of blogPosts) {
  feed.item({
    title: doc.title ?? '-',
    url: `https://willcforte.com${doc._path}`,
    date: doc.date,
    description: doc.description,
  })
}

const feedString = feed.xml({ indent: true })
event.res.setHeader('content-type', 'text/xml')
event.res.end(feedString)
