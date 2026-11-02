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
  return (
    <Card as="article">
      <CardTitle href={`/articles/${article.slug}`}>{article.title}</CardTitle>
      <CardEyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </CardEyebrow>
      <CardDescription>{article.description}</CardDescription>
      <CardCta>Read article</CardCta>
    </Card>
  )
}
