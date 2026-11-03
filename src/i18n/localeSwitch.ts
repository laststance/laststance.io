import { hasLocale, type Locale } from 'next-intl'

import { LOCALE_COOKIE, routing } from './routing'

/** The parts of an address a switch keeps; `window.location` satisfies it. */
type SwitchSource = Pick<Location, 'pathname' | 'search' | 'hash'>

/**
 * Builds the URL that switches the site to `target` while showing the same page.
 *
 * The prefixed URL never stays in the address bar: next-intl's middleware
 * answers it with a 307 to the unprefixed path and stores `target` in
 * {@link LOCALE_COOKIE}. The browser keeps the hash across that redirect.
 * Called by {@link LocaleSwitch} for its server-rendered href and on click.
 *
 * @param target - Locale to switch to.
 * @param source - Current address; `pathname` must already be locale-free (`/about`, never `/ja/about`).
 * @returns `/ja/about?page=2#top` for `/about?page=2#top`, or `/ja` for `/`.
 *
 * @example
 * ```ts
 * buildLocaleSwitchHref('ja', { pathname: '/keybinds', search: '', hash: '#move-cursor' })
 * // '/ja/keybinds#move-cursor'
 * ```
 */
export function buildLocaleSwitchHref(
  target: Locale,
  { pathname, search, hash }: SwitchSource,
): string {
  const path = pathname === '/' ? '' : pathname
  return `/${target}${path}${search}${hash}`
}

/**
 * Reads the language a visitor picked in the header from a cookie string.
 *
 * Used by {@link useStalePageGuard} to spot a page restored from the back-forward
 * cache in the language the visitor has since switched away from.
 *
 * @param cookieString - A `document.cookie`-style string, `a=1; NEXT_LOCALE=ja`.
 * @returns The chosen locale, or `undefined` when there is no choice or it is not a supported locale.
 *
 * @example
 * ```ts
 * readChosenLocale('theme=dark; NEXT_LOCALE=ja') // 'ja'
 * readChosenLocale('NEXT_LOCALE=fr') // undefined
 * ```
 */
export function readChosenLocale(cookieString: string): Locale | undefined {
  const value = cookieString
    .split(';')
    .map((pair) => pair.trim().split('='))
    .find(([name]) => name === LOCALE_COOKIE.name)?.[1]
  return hasLocale(routing.locales, value) ? value : undefined
}
