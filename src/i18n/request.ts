import { notFound } from 'next/navigation'
import * as rootParams from 'next/root-params'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { catalogs } from './catalogs'
import { routing } from './routing'

/**
 * next-intl request config, located by the plugin at `src/i18n/request.ts`.
 *
 * Runs (cached per request) on every server-side next-intl call: sync
 * `useTranslations`, `getTranslations`, `getLocale` and the server
 * `NextIntlClientProvider`. The locale is an explicit override such as
 * `getTranslations({ locale: 'en' })` when given, otherwise the `[locale]` root
 * param the proxy rewrote to. Reading the segment rather than headers keeps every
 * page statically prerendered without `setRequestLocale`.
 *
 * @throws `notFound()` when the value is not in {@link routing}, e.g. a dotted
 * path the proxy skips (`/nope.txt`) landing in `[locale]`.
 */
export default getRequestConfig(async ({ locale: override }) => {
  const candidate = override ?? (await rootParams.locale())
  if (!hasLocale(routing.locales, candidate)) notFound()

  return { locale: candidate, messages: catalogs[candidate] }
})
