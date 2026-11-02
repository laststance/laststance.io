import type { Locale } from 'next-intl'

/**
 * Formats a calendar date (`YYYY-MM-DD`) in the visitor's language.
 *
 * {@link ArticleLayout} and the article cards on the home and /articles pages
 * call it with `useLocale()`. Dates are pinned to UTC so the build machine's timezone never moves one to the day before.
 *
 * @param dateString - ISO calendar date such as `'2024-01-01'`.
 * @param locale - Locale the visitor was served.
 * @returns `'January 1, 2024'` for `en`, `'2024年1月1日'` for `ja`, and
 * `'Invalid Date'` for input that does not parse.
 *
 * @example
 * ```tsx
 * <time dateTime={article.date}>{formatDate(article.date, useLocale())}</time>
 * ```
 */
export function formatDate(dateString: string, locale: Locale): string {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  })
}
