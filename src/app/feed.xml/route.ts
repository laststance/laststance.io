import assert from 'assert'

import * as cheerio from 'cheerio'
import { Feed } from 'feed'

import { env } from '@/env.mjs'

export async function GET(req: Request) {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://laststance.io'

  const author = {
    name: 'Laststance.io',
    email: 'contact@laststance.io',
  }

  const feed = new Feed({
    id: siteUrl,
    title: author.name,
    author,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    description: 'Laststance.io Blog',
    favicon: `${siteUrl}/favicon.ico`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
    image: `${siteUrl}/favicon.ico`,
    link: siteUrl,
  })

  const articleIds = require
    .context('../articles', true, /\/page\.mdx$/)
    .keys()
    .filter((key) => key.startsWith('./'))
    .map((key) => key.slice(2).replace(/\/page\.mdx$/, ''))

  for (const id of articleIds) {
    const url = String(new URL(`/articles/${id}`, req.url))
    const html = await (await fetch(url)).text()
    const $ = cheerio.load(html)

    const publicUrl = `${siteUrl}/articles/${id}`
    const article = $('article').first()
    const title = article.find('h1').first().text()
    const date = article.find('time').first().attr('datetime')
    const content = article.find('[data-mdx-content]').first().html()

    assert(typeof title === 'string')
    assert(typeof date === 'string')
    assert(typeof content === 'string')

    feed.addItem({
      id: publicUrl,
      title,
      author: [author],
      content,
      contributor: [author],
      date: new Date(date),
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
