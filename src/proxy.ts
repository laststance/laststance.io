import type { NextRequest, NextResponse } from 'next/server'
import { hasLocale } from 'next-intl'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

/**
 * Picks the locale and rewrites `/about` to `/en/about` or `/ja/about`
 * internally, so the browser URL never changes. A `NEXT_LOCALE` cookie set by
 * the header language switch wins over Accept-Language.
 *
 * Next runs it for every page and RSC request that {@link config} matches.
 * Each language is cached under its rewritten path, so no `Vary` header is
 * needed (Next overwrites one set here anyway).
 *
 * @returns next-intl's rewrite, or for a prefixed `/ja/...` URL a 307 to the
 * unprefixed path that also stores the choice in `NEXT_LOCALE`.
 */
export default function proxy(request: NextRequest): NextResponse {
  const response = handleI18nRouting(request)
  const [, firstSegment] = request.nextUrl.pathname.split('/')
  // next-intl also pins a request without Accept-Language (curl, crawlers) to English; only a switch may store a choice.
  if (!hasLocale(routing.locales, firstSegment)) {
    response.headers.delete('set-cookie')
  }
  return response
}

export const config = {
  matcher: [
    // Skip /api, /_next, /_vercel (Analytics), /monitoring (Sentry tunnel) and dotted files.
    '/((?!api|_next|_vercel|monitoring|.*\\..*).*)',
    // Two article slugs contain a dot and still need a locale, with or without the switch's prefix.
    '/articles/:path*',
    '/:locale(en|ja)/articles/:path*',
  ],
}
