import type { Locale, Messages } from 'next-intl'

import en from './messages/en'
import ja from './messages/ja'

/**
 * Every locale's message catalog, keyed by {@link Locale}.
 *
 * The one place catalogs enter next-intl: read by {@link getRequestConfig},
 * unit tests and Storybook. Feature code reads copy through `useTranslations` /
 * `getTranslations` instead. next-intl types {@link Messages} with English
 * literal strings so it can infer ICU arguments, so `ja` (already checked
 * against {@link CatalogShape}) is widened here, once.
 */
export const catalogs = {
  en,
  ja: ja as unknown as Messages,
} satisfies Record<Locale, Messages>
