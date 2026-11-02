import { type Metadata } from 'next'
import { useLocale, useTranslations } from 'next-intl'

import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Text } from '@/components/ui/primitives'
import { getPageMetadata } from '@/i18n/pageMetadata'
import { formatDate } from '@/lib/formatDate'

const PRIVACY_UPDATED_AT = '2026-10-10'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('privacy')
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text as="p" variant="body" color="muted">
      {children}
    </Text>
  )
}

export default function Privacy() {
  const t = useTranslations('pages.privacy')
  const locale = useLocale()
  const translationNotice = t('translationNotice')

  return (
    <SimpleLayout
      title={t('meta.title')}
      intro={t('intro', { date: formatDate(PRIVACY_UPDATED_AT, locale) })}
    >
      <div className="section-stack">
        {translationNotice.length > 0 && (
          <Text as="p" variant="caption" color="muted">
            {translationNotice}
          </Text>
        )}
        <Section title={t('website.title')}>
          <div className="space-y-6">
            <Paragraph>{t('website.analytics')}</Paragraph>
            <Paragraph>{t('website.noSale')}</Paragraph>
          </div>
        </Section>

        <Section title={t('google.title')}>
          <div className="space-y-6">
            <Paragraph>{t('google.tool')}</Paragraph>
            <Paragraph>{t('google.tokens')}</Paragraph>
            <Paragraph>{t('google.limitedUse')}</Paragraph>
          </div>
        </Section>

        <Section title={t('contact.title')}>
          <Paragraph>
            {t.rich('contact.body', {
              link: (chunks) => (
                <a
                  className="text-teal-500 hover:underline"
                  href="mailto:dojce1048@gmail.com"
                >
                  {chunks}
                </a>
              ),
            })}
          </Paragraph>
        </Section>
      </div>
    </SimpleLayout>
  )
}
