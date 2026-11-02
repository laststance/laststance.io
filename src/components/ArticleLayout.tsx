import { useLocale } from 'next-intl'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { Text } from '@/components/ui/primitives'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

/**
 * Page shell for one article: title, date and the MDX body.
 *
 * Every article's `content.mdx` renders through it. Articles are written in
 * English in every locale, so the article is marked `lang="en"` for screen
 * readers on Japanese pages, while the date follows the visitor's locale.
 *
 * @example
 * ```tsx
 * <ArticleLayout article={article}>{children}</ArticleLayout>
 * ```
 */
export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  const locale = useLocale()
  return (
    <Container className="page-start">
      <div className="xl:relative">
        <div className="max-w-[72ch]">
          <article lang="en">
            <header className="relative flex flex-col">
              <Text as="h1" variant="h1">
                {article.title}
              </Text>
              <time
                lang={locale}
                dateTime={article.date}
                className="absolute bottom-full mb-6 flex items-center text-sm text-zinc-500 dark:text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date, locale)}</span>
              </time>
            </header>
            <Prose className="page-content" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
