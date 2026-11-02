/**
 * English message catalog: the source of every localized string and the type
 * every other locale must match (see {@link CatalogShape}).
 *
 * Top-level `pages` holds server-only page prose that the `[locale]` layout
 * drops before `NextIntlClientProvider`. Every other namespace also reaches
 * Client Components. English values are byte-identical to the pre-i18n JSX.
 */
const en = {
  Metadata: {
    description: 'An independent OSS organization for coding projects.',
  },

  NotFound: {
    code: '404',
    title: 'Page not found',
    description: "Sorry, we couldn't find the page you're looking for.",
    backHome: 'Go back home',
  },
} as const

export default en

/**
 * Same keys as English with any string values: what every other locale provides.
 * `ja.ts` uses `satisfies CatalogShape`, so a missing or extra key fails `tsc`.
 */
export type CatalogShape<T = typeof en> = {
  -readonly [K in keyof T]: T[K] extends string ? string : CatalogShape<T[K]>
}
