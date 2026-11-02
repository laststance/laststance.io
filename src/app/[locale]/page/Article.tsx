import { useLocale, useTranslations } from 'next-intl'

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
  const t = useTranslations('Common')
  return (
    <Card as="article">
      <CardTitle href={`/articles/${article.slug}`}>
        <span lang="en">{article.title}</span>
      </CardTitle>
      <CardEyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date, locale)}
      </CardEyebrow>
      <CardDescription>
        <span lang="en">{article.description}</span>
      </CardDescription>
      <CardCta>{t('readArticle')}</CardCta>
    </Card>
  )
}
