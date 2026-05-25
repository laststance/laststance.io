import { type Metadata } from 'next'
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
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { ARTICLES_PER_PAGE } from '@/lib/constants'
import { formatDate } from '@/lib/formatDate'

import { loadArticlesSearchParams } from './searchParams'

const title = 'Articles'
export const metadata: Metadata = {
  title: title,
  description:
    'All of my long-form thoughts on JavaScript OSS, new product, and more, collected in chronological order.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <CardTitle href={`/articles/${article.slug}`}>
          {article.title}
        </CardTitle>
        <CardEyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </CardEyebrow>
        <CardDescription>{article.description}</CardDescription>
        <CardCta>Read article</CardCta>
      </Card>
      <CardEyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
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
    <SimpleLayout
      title={
        <>
          Writing about new release, update and thought of{' '}
          {/* From the `sm` breakpoint up, keep this phrase on one line so "Web" never
              strands at a line end. On phones we let it wrap normally — forcing one line
              there would push the text off the right edge of the screen. */}
          <span className="sm:whitespace-nowrap">
            Web Application Development.
          </span>
        </>
      }
      intro={`In particular, I often write about React, CSS, JavaScript, TypeScript, and Node.js. collected in chronological order.`}
    >
      <Box className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <Box className="max-w-3xl">
          <VStack gap={16}>
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
      </Box>
    </SimpleLayout>
  )
}
