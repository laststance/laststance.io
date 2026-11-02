import { defineRouting } from 'next-intl/routing'

/**
 * Supported locales and how a request picks one.
 *
 * Public URLs never carry a locale (`localePrefix: 'never'`): the proxy rewrites
 * `/about` to `/en/about` or `/ja/about` from Accept-Language on every request,
 * with no cookie to make a choice sticky.
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
  localeCookie: false,
})
