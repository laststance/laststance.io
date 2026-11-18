import jsDocOgImage from '@/images/jsdoc-definition-og.png'
import { createArticlePage } from '@/lib/createArticlePage'

import * as ja from './content.ja.mdx'
import * as en from './content.mdx'

const { ArticlePage, generateMetadata } = createArticlePage(
  { en, ja },
  {
    image: jsDocOgImage,
    alt: {
      en: 'Go To Definition for JSDoc: F12 jumps from a JSDoc link in drawing.ts to its definition in queries.ts without an import.',
      ja: 'Go To Definition for JSDoc で、drawing.ts の JSDoc リンクから F12 で queries.ts の定義に移動する画面。import は不要です。',
    },
  },
)

export { ArticlePage as default, generateMetadata }
