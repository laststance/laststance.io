import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getPageMetadata } from '@/i18n/pageMetadata'

import { KEYBIND_GROUPS } from './keybinds'
import KeybindsClient from './KeybindsClient'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('keybinds')
}

export default function Keybinds() {
  const t = useTranslations('pages.keybinds')
  return (
    <SimpleLayout title={t('meta.title')} intro={t('intro')}>
      <KeybindsClient groups={KEYBIND_GROUPS} />
    </SimpleLayout>
  )
}
