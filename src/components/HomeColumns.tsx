import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * Aligns Home's articles with the hero and adds a second column only if supplied.
 * Home currently omits the sidebar; future callers can supply one explicitly.
 * @example
 * <HomeColumns><ArticleList /></HomeColumns>
 */
export function HomeColumns({
  children,
  aside,
}: {
  children: ReactNode
  aside?: ReactNode
}): React.JSX.Element {
  const hasAside = aside !== undefined && aside !== null && aside !== false

  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-16',
        hasAside ? 'xl:grid-cols-2' : 'content-column',
      )}
    >
      <div className="content-column min-w-0">{children}</div>
      {hasAside && <div className="min-w-0">{aside}</div>}
    </div>
  )
}
