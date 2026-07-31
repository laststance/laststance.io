import type { MetadataRoute } from 'next'

import { env } from '@/env.mjs'
import { getAllArticles } from '@/lib/articles'

const SITE_URL = env.NEXT_PUBLIC_SITE_URL || 'https://laststance.io'

interface StaticRoute {
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  path: string
  priority: number
}

/**
 * Top-level pages, listed by hand because they change rarely and each one
 * deserves its own crawl priority.
 */
const STATIC_PAGES: StaticRoute[] = [
  { changeFrequency: 'yearly', path: '', priority: 1 },
  { changeFrequency: 'monthly', path: '/about', priority: 0.8 },
  { changeFrequency: 'weekly', path: '/articles', priority: 0.8 },
  { changeFrequency: 'monthly', path: '/projects', priority: 0.5 },
  { changeFrequency: 'monthly', path: '/uses', priority: 0.5 },
  { changeFrequency: 'monthly', path: '/keybinds', priority: 0.5 },
]

const STATIC_ROUTES: MetadataRoute.Sitemap = STATIC_PAGES.map(
  ({ changeFrequency, path, priority }) => ({
    changeFrequency,
    lastModified: new Date(),
    priority,
    url: `${SITE_URL}${path}`,
  }),
)

/**
 * Builds the sitemap from the static page list plus every article in the
 * generated manifest.
 *
 * Articles are enumerated rather than hard-coded so a new post shows up as soon
 * as `scripts/generate-articles-manifest.mjs` has run — the previous version
 * listed six URLs by hand and silently omitted every post added after it.
 * `lastModified` uses each article's publish date, since that is the only
 * timestamp the manifest carries.
 * @returns Sitemap entries for all indexable routes.
 * @example
 *   // GET /sitemap.xml renders the return value of this function
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    changeFrequency: 'yearly',
    lastModified: new Date(article.date),
    priority: 0.5,
    url: `${SITE_URL}/articles/${article.slug}`,
  }))

  return [...STATIC_ROUTES, ...articleRoutes]
}
