import path from 'path'
import { fileURLToPath } from 'url'

import glob from 'fast-glob'
import { unstable_cache } from 'next/cache'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Article {
  title: string
  author: string
  date: string
  description: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  const { article } = (await import(`../app/articles/${articleFilename}`)) as {
    article: Article
    default: React.ComponentType
  }

  return {
    slug: articleFilename.replace(/(\/content)?\.mdx$/, ''),
    ...article,
  }
}

/**
 * Fetches and caches all articles from the filesystem.
 * Wrapped with unstable_cache so the glob result persists across ISR
 * revalidations on Vercel, where source .mdx files may not exist in
 * the serverless function's compiled output.
 * @returns Sorted array of articles (newest first)
 * @example
 * const articles = await getAllArticles()
 * // [{ slug: 'my-post', title: '...', date: '2026-01-01', ... }, ...]
 */
export const getAllArticles = unstable_cache(
  async (): Promise<ArticleWithSlug[]> => {
    const articleFilenames = await glob('*/content.mdx', {
      cwd: path.join(__dirname, '../app/articles'),
    })

    const articles = await Promise.all(articleFilenames.map(importArticle))

    return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
  },
  ['all-articles'],
  { tags: ['all-articles'] },
)
