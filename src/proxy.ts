import type { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

/**
 * Picks the locale from Accept-Language and rewrites `/about` to `/en/about` or
 * `/ja/about` internally, so the browser URL never changes.
 *
 * Next runs it for every page and RSC request that {@link config} matches. It
 * lives next to `app/`, which is why the repo-root `proxy.ts` never runs.
 * `Vary: Accept-Language` tells caches that one URL has a copy per language.
 *
 * @returns next-intl's rewrite, or a redirect for a stray `/ja/...` URL.
 */
export default function proxy(request: NextRequest): NextResponse {
  const response = handleI18nRouting(request)
  response.headers.append('Vary', 'Accept-Language')
  return response
}

export const config = {
  matcher: [
    // Skip /api, /_next, /_vercel (Analytics), /monitoring (Sentry tunnel) and dotted files.
    '/((?!api|_next|_vercel|monitoring|.*\\..*).*)',
    // Two article slugs contain a dot and still need a locale.
    '/articles/:path*',
  ],
}
