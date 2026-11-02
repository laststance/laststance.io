import { type Metadata } from 'next'
import { useLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { type SearchParams } from 'nuqs/server'

import {
  Card,
  CardTitle,
  CardEyebrow,
  CardDescription,
  CardCta,
} from '@/components/Card'
import { Pagination } from '@/components/Pagination'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Box, VStack } from '@/components/ui/primitives'
import { getPageMetadata } from '@/i18n/pageMetadata'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { ARTICLES_PER_PAGE } from '@/lib/constants'
import { formatDate } from '@/lib/formatDate'

import { loadArticlesSearchParams } from './searchParams'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('articles')
}

function Article({ article }: { article: ArticleWithSlug }) {
  const locale = useLocale()
  const t = useTranslations('Common')
  return (
    <article className="reference-grid">
      <Card className="min-w-0">
        <CardTitle href={`/articles/${article.slug}`}>
          {article.title}
        </CardTitle>
        <CardEyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date, locale)}
        </CardEyebrow>
        <CardDescription>{article.description}</CardDescription>
        <CardCta>{t('readArticle')}</CardCta>
      </Card>
      <CardEyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date, locale)}
      </CardEyebrow>
    </article>
  )
}

interface ArticlesIndexProps {
  // Next.js 16 App Router exposes searchParams as a Promise.
  searchParams: Promise<SearchParams>
}

export default async function ArticlesIndex({
  searchParams,
}: ArticlesIndexProps) {
  const { page: requestedPage } = await loadArticlesSearchParams(searchParams)
  const articles = await getAllArticles()
  const t = await getTranslations('pages.articles')

  // Clamp the requested page to the valid range so /articles?page=999 still
  // renders the last available page instead of an empty list or 404.
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages)

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const paginatedArticles = articles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE,
  )

  return (
    <SimpleLayout title={t('meta.title')} intro={t('intro')}>
      <Box className="content-column">
        <VStack gap={12}>
          {paginatedArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </VStack>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/articles"
        />
      </Box>
    </SimpleLayout>
  )
}
