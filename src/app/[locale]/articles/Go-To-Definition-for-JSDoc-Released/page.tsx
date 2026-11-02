import type { Metadata } from 'next'

import jsDocOgImage from '@/images/jsdoc-definition-og.png'

import Content, { article } from './content.mdx'

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  openGraph: {
    title: article.title,
    images: [
      {
        url: jsDocOgImage.src,
        width: jsDocOgImage.width,
        height: jsDocOgImage.height,
        alt: 'Go To Definition for JSDoc: F12 jumps from a JSDoc link in drawing.ts to its definition in queries.ts without an import.',
      },
    ],
  },
}

export default Content
