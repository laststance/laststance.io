import { type Metadata } from 'next'

import {
  Card,
  CardTitle,
  CardEyebrow,
  CardDescription,
  CardCta,
} from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Box, VStack } from '@/components/ui/primitives'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

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

export default async function ArticlesIndex() {
  const articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing about new release, update and thought of Web Application Development."
      intro={`In particular, I often write about React, CSS, JavaScript, TypeScript,and Node.js. collected in chronological order.`}
    >
      <Box className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <VStack gap={16} className="max-w-3xl">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </VStack>
      </Box>
    </SimpleLayout>
  )
}
