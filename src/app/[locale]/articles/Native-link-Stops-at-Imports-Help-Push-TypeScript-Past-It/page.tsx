import { createArticlePage } from '@/lib/createArticlePage'

import * as ja from './content.ja.mdx'
import * as en from './content.mdx'

const { ArticlePage, generateMetadata } = createArticlePage({ en, ja })

export { ArticlePage as default, generateMetadata }
