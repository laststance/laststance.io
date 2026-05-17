import { articlesManifest } from './articles-manifest'

interface Article {
  title: string
  /** Some legacy MDX files use the misspelled `auhtor` key. Both are optional
   *  here so `articles-manifest.ts` (which mirrors the source verbatim) type-checks. */
  author?: string
  auhtor?: string
  date: string
  description: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

/**
 * Returns every article sorted newest-first.
 *
 * Reads from `src/lib/articles-manifest.ts`, which is generated at build time
 * by `scripts/generate-articles-manifest.mjs` and statically bundled into the
 * serverless function. The previous implementation glob'd the filesystem at
 * request time and crashed on Vercel because the MDX source files aren't
 * shipped alongside the compiled function.
 *
 * Stays async so existing callers (`await getAllArticles()`) keep working
 * without a touch.
 * @returns Sorted array of articles (newest first).
 * @example
 *   const articles = await getAllArticles()
 *   // [{ slug: 'my-post', title: '...', date: '2026-01-01', ... }, ...]
 */
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  return articlesManifest
}
