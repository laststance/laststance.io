import type { Metadata } from 'next'
import type { Messages } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { routing } from './routing'

/** Page namespaces under `pages.*` that declare `meta: { title, description }`. */
export type PageWithMeta = {
  [Page in keyof Messages['pages']]: Messages['pages'][Page] extends {
    meta: { title: string; description: string }
  }
    ? Page
    : never
}[keyof Messages['pages']]

/**
 * Localized `<title>` and description for one page, with an English OG image.
 *
 * Each page's `generateMetadata` calls it, so every page localizes its metadata
 * the same way. The OG image title stays English because `/api/og` ships a font
 * without Japanese glyphs; `openGraph.title` follows the visitor's locale.
 *
 * @param page - Key under `pages` in the catalog, e.g. `'uses'`.
 * @returns Metadata that Next merges with the layout's `%s - Laststance.io` template.
 *
 * @example
 * ```ts
 * export async function generateMetadata(): Promise<Metadata> {
 *   return getPageMetadata('uses')
 * }
 * ```
 */
export async function getPageMetadata(page: PageWithMeta): Promise<Metadata> {
  const namespace = `pages.${page}.meta` as const
  const t = await getTranslations(namespace)
  const english = await getTranslations({
    locale: routing.defaultLocale,
    namespace,
  })
  const title = t('title')
  return {
    title,
    description: t('description'),
    openGraph: {
      title,
      images: [`/api/og?title=${english('title')}`],
    },
  }
}
