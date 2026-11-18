import type { Metadata } from 'next'
import type { StaticImageData } from 'next/image'
import type { Locale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { ComponentType } from 'react'

import type { ArticleMetadata } from './articles'

interface ArticleEdition {
  article: ArticleMetadata
  default: ComponentType
}

/**
 * Binds an article route to its two MDX editions. Next calls the returned page
 * and metadata functions separately, both using the locale selected by the proxy.
 *
 * @param artwork - Optional editorial artwork. Generated cards use the English
 * title because the bundled OG font only supports Latin text.
 * @example
 * const { ArticlePage, generateMetadata } = createArticlePage({ en, ja })
 */
export function createArticlePage(
  editions: Record<Locale, ArticleEdition>,
  artwork?: { image: StaticImageData; alt: Record<Locale, string> },
) {
  async function ArticlePage(): Promise<React.JSX.Element> {
    const { default: Content } = editions[await getLocale()]
    return <Content />
  }

  async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale()
    const { title, description } = editions[locale].article
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: artwork
          ? [
              {
                url: artwork.image.src,
                width: artwork.image.width,
                height: artwork.image.height,
                alt: artwork.alt[locale],
              },
            ]
          : [`/api/og?title=${encodeURIComponent(editions.en.article.title)}`],
      },
    }
  }

  return { ArticlePage, generateMetadata }
}
