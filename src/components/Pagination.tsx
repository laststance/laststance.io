import Link from 'next/link'

import { cn } from '@/lib/utils'

interface PaginationProps {
  /** 1-indexed current page */
  currentPage: number
  /** Total number of pages (>= 1) */
  totalPages: number
  /** Base href without query string, e.g. "/articles" */
  basePath: string
}

/**
 * 📄 Pagination
 * Server-component pagination control with Prev/Next + numbered page links.
 * Renders as `<nav>` for accessibility. Page 1 omits the `?page=` query so
 * the canonical /articles URL stays clean and dedupes with search-engine indexes.
 * Compact numbered list with ellipsis (1 … 4 5 6 … 12) keeps mobile widths short.
 * @example
 * <Pagination currentPage={2} totalPages={6} basePath="/articles" />
 */
export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  // Only one page total → nothing to navigate, skip rendering.
  if (totalPages <= 1) return null

  const pages = buildPageList(currentPage, totalPages)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-1 sm:gap-2"
    >
      <PaginationItem
        href={hrefForPage(basePath, prevPage)}
        disabled={isFirstPage}
        ariaLabel="Go to previous page"
        rel="prev"
      >
        <span aria-hidden="true">←</span>
        <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
      </PaginationItem>
      {pages.map((entry, index) =>
        entry === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="px-2 text-sm text-zinc-400 dark:text-zinc-500"
          >
            …
          </span>
        ) : (
          <PaginationItem
            key={entry}
            href={hrefForPage(basePath, entry)}
            current={entry === currentPage}
            ariaLabel={`Go to page ${entry}`}
          >
            {entry}
          </PaginationItem>
        ),
      )}
      <PaginationItem
        href={hrefForPage(basePath, nextPage)}
        disabled={isLastPage}
        ariaLabel="Go to next page"
        rel="next"
      >
        <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
        <span aria-hidden="true">→</span>
      </PaginationItem>
    </nav>
  )
}

interface PaginationItemProps {
  href: string
  children: React.ReactNode
  current?: boolean
  disabled?: boolean
  ariaLabel: string
  rel?: 'prev' | 'next'
}

// Single link or disabled placeholder. Kept local since the shape is specific
// to this pagination control (current/disabled styling differs from buttons).
function PaginationItem({
  href,
  children,
  current = false,
  disabled = false,
  ariaLabel,
  rel,
}: PaginationItemProps) {
  const className = cn(
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors',
    current
      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
    disabled && 'pointer-events-none opacity-40',
  )

  if (disabled) {
    return (
      <span aria-hidden="true" className={className}>
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={current ? 'page' : undefined}
      rel={rel}
      className={className}
    >
      {children}
    </Link>
  )
}

// Page 1 keeps the canonical "/articles" path (no ?page=1) for SEO cleanliness.
function hrefForPage(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`
}

/**
 * Build the visible page-number list with ellipsis markers.
 * Always shows first / last / current ± 1; collapses the rest to `'ellipsis'`.
 * @returns Array of page numbers and ellipsis markers in display order.
 * @example
 * buildPageList(2, 5)   // => [1, 2, 3, 4, 5]               (small set — no ellipsis)
 * buildPageList(1, 10)  // => [1, 2, 'ellipsis', 10]        (near start — trailing ellipsis only)
 * buildPageList(4, 10)  // => [1, 'ellipsis', 3, 4, 5, 'ellipsis', 10] (middle — both ellipses)
 * buildPageList(10, 10) // => [1, 'ellipsis', 9, 10]        (near end — leading ellipsis only)
 */
type PageEntry = number | 'ellipsis'
export function buildPageList(
  currentPage: number,
  totalPages: number,
): PageEntry[] {
  // Small page counts render every page directly — no ellipsis needed.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const entries: PageEntry[] = [1]
  const windowStart = Math.max(2, currentPage - 1)
  const windowEnd = Math.min(totalPages - 1, currentPage + 1)

  if (windowStart > 2) entries.push('ellipsis')

  for (let page = windowStart; page <= windowEnd; page++) {
    entries.push(page)
  }

  if (windowEnd < totalPages - 1) entries.push('ellipsis')

  entries.push(totalPages)
  return entries
}
