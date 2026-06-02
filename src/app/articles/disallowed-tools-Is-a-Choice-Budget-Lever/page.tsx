import type { Metadata } from 'next'

import Content, { article } from './content.mdx'

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  openGraph: {
    title: article.title,
    images: [`/api/og?title=${encodeURIComponent(article.title)}`],
  },
}

export default Content
