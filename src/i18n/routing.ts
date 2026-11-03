import { defineRouting } from 'next-intl/routing'

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

/**
 * The `NEXT_LOCALE` cookie that remembers a language picked in the header.
 *
 * Only next-intl's middleware writes it, on the 307 from a prefixed URL such as
 * `/ja/about` to `/about`, which is where {@link LocaleSwitch} sends the browser.
 * Read by the proxy through {@link routing} and by {@link readChosenLocale}.
 */
export const LOCALE_COOKIE = {
  name: 'NEXT_LOCALE',
  maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
  sameSite: 'lax',
  path: '/',
} as const

/**
 * Supported locales and how a request picks one.
 *
 * Public URLs never carry a locale (`localePrefix: 'never'`): the proxy rewrites
 * `/about` to `/en/about` or `/ja/about`. A language chosen in the header wins
 * through {@link LOCALE_COOKIE}. Visitors who never choose get Accept-Language,
 * with English as the fallback, and no cookie.
 *
 * Read by `src/proxy.ts`, {@link getRequestConfig} in `request.ts`, the
 * locale-stripped {@link usePathname} and the `[locale]` layout's
 * `generateStaticParams`. A locale added here fails `tsc` in {@link catalogs}
 * until it has a catalog.
 */
export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'never',
  localeCookie: LOCALE_COOKIE,
})
