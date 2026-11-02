import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

/**
 * Locale-stripped pathname for Client Components: `'/about'`, never `'/ja/about'`.
 *
 * Pages prerender at `/en/about` and `/ja/about` and are served through the proxy
 * rewrite from `/about`, so Next's own `usePathname()` differs between the
 * prerender and the hydrated browser. This one strips the locale on both sides,
 * so pathname checks in Header, NavItem and ProvidersClient hydrate to what the
 * HTML rendered. Only `usePathname` is exported: with `localePrefix: 'never'`
 * a plain `next/link` href is already correct.
 *
 * @example
 * ```tsx
 * const isActive = usePathname() === href
 * ```
 */
export const { usePathname } = createNavigation(routing)
