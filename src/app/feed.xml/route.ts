import { Feed } from 'feed'

import { getAllArticles } from '@/lib/articles'
import { SITE_URL } from '@/lib/siteUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

/**
 * Generates an RSS feed for all blog articles.
 * Uses article metadata (title, date, description) to build the feed
 * without requiring HTTP fetch or react-dom/server.
 *
 * @returns RSS 2.0 XML response
 */
export async function GET() {
  const author = {
    name: 'Laststance.io',
    email: 'contact@laststance.io',
  }

  const feed = new Feed({
    id: SITE_URL,
    title: author.name,
    author,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    description: 'Laststance.io Blog',
    favicon: `${SITE_URL}/favicon.ico`,
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
    image: `${SITE_URL}/favicon.ico`,
    link: SITE_URL,
  })

  const articles = await getAllArticles()

  for (const article of articles) {
    const publicUrl = `${SITE_URL}/articles/${article.slug}`

    feed.addItem({
      id: publicUrl,
      title: article.title,
      author: [author],
      content: article.description,
      description: article.description,
      contributor: [author],
      date: new Date(article.date),
      link: publicUrl,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'cache-control': 's-maxage=31556952',
      'content-type': 'application/xml',
    },
    status: 200,
  })
}
