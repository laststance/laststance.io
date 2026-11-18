import type { Locale } from 'next-intl'

import { articlesManifest } from './articles-manifest'

export interface ArticleMetadata {
  title: string
  author: string
  date: string
  description: string
}

export interface ArticleWithSlug extends ArticleMetadata {
  slug: string
}

export interface ArticleManifestEntry {
  slug: string
  author: string
  date: string
  editions: Record<Locale, Pick<ArticleMetadata, 'title' | 'description'>>
}

/**
 * Reads newest-first article summaries from the bundled build-time manifest.
 * The home page and archive pass the visitor's locale. RSS and sitemap callers
 * default to English and use one canonical URL per article.
 *
 * @example
 * const articles = await getAllArticles('ja')
 */
export async function getAllArticles(
  locale: Locale = 'en',
): Promise<ArticleWithSlug[]> {
  return articlesManifest.map(({ slug, author, date, editions }) => ({
    slug,
    author,
    date,
    ...editions[locale],
  }))
}
