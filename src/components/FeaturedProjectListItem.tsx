import Image from 'next/image'
import Link from 'next/link'

import { type FeaturedProject } from '@/lib/projects'

type FeaturedProjectListItemProps = FeaturedProject

/**
 * Shows a project with its purpose visible before hover or keyboard focus.
 * Used by the Projects page for each published featured record.
 * @example
 * <FeaturedProjectListItem {...project} />
 */
export function FeaturedProjectListItem({
  name,
  description,
  category,
  href,
  logo,
}: FeaturedProjectListItemProps) {
  return (
    <article className="border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} — ${category} (opens in new tab)`}
        className="group grid grid-cols-[2rem_minmax(0,1fr)_1rem] items-start gap-4 rounded-sm py-8 sm:gap-6 sm:py-10"
      >
        <Image src={logo} alt="" className="mt-1 h-8 w-8" unoptimized />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight wrap-anywhere text-zinc-900 group-hover:text-teal-700 sm:text-xl dark:text-zinc-100 dark:group-hover:text-teal-400">
            {name}
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            {category}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-zinc-500 group-hover:text-teal-700 dark:group-hover:text-teal-400"
        >
          ↗
        </span>
      </Link>
    </article>
  )
}
