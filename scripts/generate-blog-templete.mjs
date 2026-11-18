import { promises as fs } from 'node:fs'

import { intro, isCancel, outro, spinner, text } from '@clack/prompts'

intro('Create an English and Japanese blog post')

/**
 * Collects one field for the two MDX editions. A cancellation ends the CLI
 * before it creates the article directory or writes either edition.
 * @example
 * const title = await readField('English title')
 */
async function readField(label) {
  const value = await text({
    message: label,
    validate: (input) => (input?.trim() ? undefined : `${label} is required`),
  })
  if (isCancel(value)) process.exit(0)
  return value.trim()
}

const title = await readField('English title')
const description = await readField('English description')
const japaneseTitle = await readField('Japanese title')
const japaneseDescription = await readField('Japanese description')

const published_at = () => {
  const date = new Date()
  const options = { timeZone: 'Asia/Tokyo', hour12: false }

  const localISOTime = new Date(date.toLocaleString(options)).toISOString()
  return localISOTime.slice(0, 10)
}

const date = published_at()
const mdxTemplate = (
  editionTitle,
  editionDescription,
) => `import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  author: 'Ryota Murakami',
  title: ${JSON.stringify(editionTitle)},
  date: '${date}',
  description: ${JSON.stringify(editionDescription)},
}

export default (props) => <ArticleLayout article={article} {...props} />
`

const pageTsxTemplate = `import { createArticlePage } from '@/lib/createArticlePage'

import * as ja from './content.ja.mdx'
import * as en from './content.mdx'

const { ArticlePage, generateMetadata } = createArticlePage({ en, ja })

export { ArticlePage as default, generateMetadata }
`

const wordList = title.split(' ')
const folderName = wordList.length === 1 ? title : wordList.join('-')

const folderPath = `./src/app/[locale]/articles/${folderName.replace(/[^\w|-]/g, '')}`

const s = spinner()
s.start('processing...')

await fs.mkdir(folderPath)
await fs.writeFile(`${folderPath}/content.mdx`, mdxTemplate(title, description))
await fs.writeFile(
  `${folderPath}/content.ja.mdx`,
  mdxTemplate(japaneseTitle, japaneseDescription),
)
await fs.writeFile(`${folderPath}/page.tsx`, pageTsxTemplate)
s.stop('processing...')

outro(`${folderPath} generated!✅`)
