import { promises as fs } from 'node:fs'

import { intro, outro, spinner, text } from '@clack/prompts'

intro('generate post markdown templete.')

const title = await text({
  message: 'What is the Title?',
  placeholder: 'I Got This',
  initialValue: '',
  validate(value) {
    if (value.length === 0) return `Title is required!`
  },
})

const description = await text({
  message: 'What is the description?',
  placeholder: 'description',
  initialValue: '',
  validate(value) {
    if (value.length === 0) return `snippet is required!`
  },
})

const published_at = () => {
  const date = new Date()
  const options = { timeZone: 'Asia/Tokyo', hour12: false }

  const localISOTime = new Date(date.toLocaleString(options)).toISOString()
  return localISOTime.slice(0, 10)
}

const mdxTemplate = `
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  auhtor: 'Ryota Murakami',
  title: '${title}',
  date: '${published_at()}',
  description: '${description}',
}

export default (props) => <ArticleLayout article={article} {...props} />
`

const pageTsxTemplate = `import type { Metadata } from 'next'
import Content, { article } from './content.mdx'

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  openGraph: {
    title: article.title,
    images: [\\\`/api/og?title=\\\${article.title}\\\`],
  },
}

export default Content
`

const wordList = title.split(' ')
const folderName = wordList.length === 1 ? title : wordList.join('-')

const folderPath = `./src/app/articles/${folderName.replace(/[^\w|-]/g, '')}`

const s = spinner()
s.start('processing...')

await fs.mkdir(folderPath)
await fs.writeFile(`${folderPath}/content.mdx`, mdxTemplate)
await fs.writeFile(`${folderPath}/page.tsx`, pageTsxTemplate)
s.stop('processing...')

outro(`${folderPath} generated!✅`)
