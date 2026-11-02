import { useTranslations } from 'next-intl'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Text } from '@/components/ui/primitives'

/**
 * Localized 404 rendered inside the `[locale]` layout.
 *
 * Shown when `notFound()` is thrown under `[locale]`, most often by the
 * `[...rest]` catch-all for an unknown path such as a missing article.
 */
export default function NotFound(): React.JSX.Element {
  const t = useTranslations('NotFound')
  return (
    <Container className="page-start">
      <div className="relative flex flex-col items-start">
        <p className="absolute bottom-full mb-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {t('code')}
        </p>
        <Text as="h1" variant="h1">
          {t('title')}
        </Text>
        <p className="page-intro text-base text-zinc-600 dark:text-zinc-400">
          {t('description')}
        </p>
        <Button href="/" variant="secondary" className="page-intro">
          {t('backHome')}
        </Button>
      </div>
    </Container>
  )
}
