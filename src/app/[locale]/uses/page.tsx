import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { Card, CardTitle } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Text } from '@/components/ui/primitives'
import { getPageMetadata } from '@/i18n/pageMetadata'
import { proseTags } from '@/i18n/proseTags'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul className="space-y-8">{children}</ul>
    </Section>
  )
}

function Tool({
  title,
  children,
  href,
}: {
  title: React.ReactNode
  children: React.ReactNode
  href?: string
}) {
  return (
    <Card as="li" className="gap-2">
      <CardTitle as="h3" href={href}>
        {title}
      </CardTitle>
      <Text as="p" variant="body" color="muted" className="relative z-10">
        {children}
      </Text>
    </Card>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('uses')
}

export default function Uses() {
  const t = useTranslations('pages.uses')
  return (
    <SimpleLayout title={t('meta.title')} intro={t('intro')}>
      <div className="section-stack">
        <ToolsSection title={t('sections.hardware')}>
          <Tool
            title={t('tools.macbookPro.title')}
            href="https://support.apple.com/en-us/121554"
          >
            {t.rich('tools.macbookPro.body', proseTags)}
          </Tool>
          <Tool
            title={t('tools.magicKeyboard.title')}
            href="https://www.apple.com/shop/product/MK2A3LL/A/magic-keyboard-us-english"
          >
            {t('tools.magicKeyboard.body')}
          </Tool>
          <Tool
            title={t('tools.magicTrackpad.title')}
            href="https://www.apple.com/shop/product/MK2D3AM/A/magic-trackpad-white-multi-touch-surface"
          >
            {t('tools.magicTrackpad.body')}
          </Tool>
          <Tool
            title={t('tools.expressKeyboardPlatform.title')}
            href="https://bullettrain.com/products/express-keyboard-platform?variant=3508308246568"
          >
            {t('tools.expressKeyboardPlatform.body')}
          </Tool>
          <Tool
            title={t('tools.lgUltragear.title')}
            href="https://www.amazon.com/LG-24GN650-B-Ultragear-FreeSync-Adjustable/dp/B08V85XBFZ?th=1"
          >
            {t.rich('tools.lgUltragear.body', proseTags)}
          </Tool>
        </ToolsSection>
        <ToolsSection title={t('sections.development')}>
          <Tool title={t('tools.cursor.title')} href="https://www.cursor.so/">
            {t('tools.cursor.body')}
          </Tool>
          <Tool
            title={t('tools.webstorm.title')}
            href="https://www.jetbrains.com/webstorm/"
          >
            {t('tools.webstorm.body')}
          </Tool>
          <Tool
            title={t('tools.terminal.title')}
            href="https://github.com/ryota-murakami/dotfiles/blob/master/mysetting.terminal"
          >
            {t('tools.terminal.body')}
          </Tool>
          <Tool
            title={t('tools.fishShell.title')}
            href="https://github.com/ryota-murakami/dotfiles/blob/master/.config/fish/config.fish"
          >
            {t('tools.fishShell.body')}
          </Tool>
          <Tool title={t('tools.volta.title')} href="https://volta.sh/">
            {t('tools.volta.body')}
          </Tool>
          <Tool title={t('tools.pnpm.title')} href="https://pnpm.io/">
            {t.rich('tools.pnpm.body', proseTags)}
          </Tool>
          <Tool title={t('tools.figma.title')} href="https://www.figma.com/">
            {t.rich('tools.figma.body', proseTags)}
          </Tool>
        </ToolsSection>
        <ToolsSection title={t('sections.utility')}>
          <Tool
            title={t('tools.raycast.title')}
            href="https://www.raycast.com/"
          >
            {t.rich('tools.raycast.body', proseTags)}
          </Tool>
          <Tool
            title={t('tools.istatMenus.title')}
            href="https://bjango.com/mac/istatmenus/"
          >
            {t.rich('tools.istatMenus.body', proseTags)}
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
