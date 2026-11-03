'use client'

import clsx from 'clsx'
import { useLocale, useTranslations, type Locale } from 'next-intl'
import { useEffect } from 'react'

import { buildLocaleSwitchHref, readChosenLocale } from '@/i18n/localeSwitch'
import { usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LOCALE_ENDONYMS = {
  en: 'English',
  ja: '日本語',
} as const satisfies Record<Locale, string>

const STALE_PAGE_RELOAD_KEY = 'locale-guard-reload'

type Variant = 'pill' | 'menuRow'

const LINK_CLASS_NAMES = {
  pill: 'inline-flex min-h-11 items-center rounded-full bg-white/90 px-3 py-2 text-sm font-medium whitespace-nowrap text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition hover:text-teal-500 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:text-teal-400 dark:hover:ring-white/20',
  menuRow: 'flex min-h-11 items-center py-2',
} as const satisfies Record<Variant, string>

type LocaleSwitchProps = {
  variant: Variant
  className?: string
}

/**
 * Switches the site between English and 日本語 from the header.
 *
 * Renders a plain link to every locale other than the current one. The server
 * does the switch: the link points at a prefixed URL that next-intl's middleware
 * redirects to the unprefixed page while storing the choice in `NEXT_LOCALE`.
 * The full page load also drops any prefetched pages in the old language.
 * Rendered by {@link Header} (`pill`, 640px and up) and {@link MobileNavigation}
 * (`menuRow`, inside the Menu panel below 640px).
 *
 * @param variant - `pill` matches {@link ThemeToggle}; `menuRow` matches the Menu panel's rows.
 * @param className - Applied to the outer element, e.g. to hide it at some widths.
 *
 * @example
 * ```tsx
 * <LocaleSwitch variant="pill" className="hidden sm:flex" />
 * ```
 */
export function LocaleSwitch({
  variant,
  className,
}: LocaleSwitchProps): React.ReactElement {
  const t = useTranslations('LocaleSwitch')
  const current = useLocale()
  const pathname = usePathname()
  const targets = routing.locales.filter((locale) => locale !== current)

  const links = targets.map((target) => (
    <a
      key={target}
      // Without JavaScript the click falls back to this href, which keeps the page but drops the query and hash.
      href={buildLocaleSwitchHref(target, { pathname, search: '', hash: '' })}
      hrefLang={target}
      rel="nofollow"
      className={LINK_CLASS_NAMES[variant]}
      onClick={(event) => {
        // Modified and middle clicks open the plain href in a new tab or window.
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        // replace keeps the old-language page out of history, so Back never returns to it.
        window.location.replace(buildLocaleSwitchHref(target, window.location))
      }}
    >
      <span className="sr-only">{t('switchTo')} </span>
      <span lang={target}>{LOCALE_ENDONYMS[target]}</span>
    </a>
  ))

  if (variant === 'pill') {
    return <div className={clsx('flex gap-2', className)}>{links}</div>
  }

  return (
    <div
      className={clsx(
        'mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-100/5',
        className,
      )}
    >
      <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {t('menuHeading')}
      </h2>
      <div className="mt-2 text-base text-zinc-800 dark:text-zinc-300">
        {links}
      </div>
    </div>
  )
}

/**
 * Reloads a page shown in a language the visitor has since switched away from.
 *
 * The page URL is the same in both languages and the HTML carries no
 * `Vary: Cookie`, so Back, a back-forward cache restore or another open tab can
 * show the old language after a switch. Runs on mount and on every `pageshow`.
 * A reload that did not fix the page is not retried, so a cache that keeps
 * serving the old language cannot cause a reload loop. Called once by {@link Header}.
 *
 * @param current - Locale the page was rendered in.
 *
 * @example
 * ```tsx
 * useStalePageGuard(useLocale())
 * ```
 */
export function useStalePageGuard(current: Locale): void {
  useEffect(() => {
    function reloadIfStale(): void {
      const chosen = readChosenLocale(document.cookie)
      if (chosen === undefined || chosen === current) {
        sessionStorage.removeItem(STALE_PAGE_RELOAD_KEY)
        return
      }
      const attempt = `${chosen}|${window.location.pathname}`
      if (sessionStorage.getItem(STALE_PAGE_RELOAD_KEY) === attempt) return
      sessionStorage.setItem(STALE_PAGE_RELOAD_KEY, attempt)
      window.location.reload()
    }

    reloadIfStale()
    window.addEventListener('pageshow', reloadIfStale)
    return (): void => window.removeEventListener('pageshow', reloadIfStale)
  }, [current])
}
