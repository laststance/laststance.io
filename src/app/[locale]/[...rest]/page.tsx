import { notFound } from 'next/navigation'

/**
 * Catches every path under a locale that no static route matched, such as
 * `/en/articles/this-article-does-not-exist`.
 *
 * Next renders `[locale]/not-found.tsx` only for a `notFound()` thrown inside a
 * segment, so without this page an unknown path would skip the localized 404.
 * It throws before streaming starts, so the status is a real 404. Static routes,
 * including all article folders, always win over it.
 */
export default function CatchAllPage(): never {
  notFound()
}
