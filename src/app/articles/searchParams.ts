import { createLoader, parseAsInteger } from 'nuqs/server'

/**
 * Search-params schema for /articles.
 * `page` is 1-indexed; nuqs falls back to 1 when missing or unparseable.
 * @example
 * // /articles → { page: 1 }
 * // /articles?page=3 → { page: 3 }
 * // /articles?page=abc → { page: 1 } (falls back to default)
 */
export const articlesSearchParams = {
  page: parseAsInteger.withDefault(1),
}

export const loadArticlesSearchParams = createLoader(articlesSearchParams)
