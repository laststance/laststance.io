import { useLocale } from 'next-intl'

import {
  Card,
  CardDescription,
  CardCta,
  CardTitle,
  CardEyebrow,
} from '@/components/Card'
import type { ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export function Article({ article }: { article: ArticleWithSlug }) {
  const locale = useLocale()
  return (
    <Card as="article">
      <CardTitle href={`/articles/${article.slug}`}>{article.title}</CardTitle>
      <CardEyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date, locale)}
      </CardEyebrow>
      <CardDescription>{article.description}</CardDescription>
      <CardCta>Read article</CardCta>
    </Card>
  )
}
