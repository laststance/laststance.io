import type { Decorator, Preview } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'

import { catalogs } from '@/i18n/catalogs'
import '@/styles/global.css'

/**
 * Wraps every story in the next-intl context that the `[locale]` layout gives the app.
 *
 * Components that read copy with `useTranslations`, or the pathname with
 * {@link usePathname} from `@/i18n/navigation`, throw without it. The `locale`
 * toolbar global switches stories to Japanese for visual review; tests run in
 * English through `initialGlobals`.
 */
const withIntl: Decorator = (Story, context) => {
  const locale = context.globals.locale === 'ja' ? 'ja' : 'en'
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={catalogs[locale]}
      timeZone="UTC"
    >
      <Story />
    </NextIntlClientProvider>
  )
}

const preview: Preview = {
  decorators: [withIntl],
  globalTypes: {
    locale: {
      description: 'UI language',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ja', title: '日本語' },
        ],
      },
    },
  },
  initialGlobals: { locale: 'en' },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'error' - fail CI on a11y violations
      // 'todo' - show a11y violations in the test UI only
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
}

export default preview
