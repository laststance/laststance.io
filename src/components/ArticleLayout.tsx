import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { Text } from '@/components/ui/primitives'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  return (
    <Container className="page-start">
      <div className="xl:relative">
        <div className="max-w-[72ch]">
          <article>
            <header className="relative flex flex-col">
              <Text as="h1" variant="h1">
                {article.title}
              </Text>
              <time
                dateTime={article.date}
                className="absolute bottom-full mb-6 flex items-center text-sm text-zinc-500 dark:text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
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
