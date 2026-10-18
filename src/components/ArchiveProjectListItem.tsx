import Image from 'next/image'
import Link from 'next/link'

import { Text } from '@/components/ui/primitives'
import { type ArchiveProject } from '@/lib/projects'

/**
 * Shows a compact reference project with a visible purpose and wrapping name.
 * Projects renders this row only when its Stable list has published entries.
 * @example
 * <ArchiveProjectListItem {...project} />
 */
export function ArchiveProjectListItem({
  name,
  description,
  category,
  href,
  logo,
}: ArchiveProject) {
  return (
    <li className="border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={description}
        aria-label={`${name} - ${category} (opens in new tab)`}
        className="group flex min-h-11 items-start gap-3 py-4 outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:gap-4 dark:focus-visible:ring-offset-zinc-900"
      >
        <Image
          src={logo}
          alt=""
          className="h-5 w-5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
          unoptimized
        />
        <Text
          as="span"
          variant="bodySmall"
          className="min-w-0 wrap-anywhere text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-50"
        >
          {name}
          <span className="mt-2 block text-sm leading-6 font-normal text-zinc-600 dark:text-zinc-400">
            {description}
          </span>
        </Text>
        <Text
          as="span"
          variant="caption"
          color="muted"
          transform="uppercase"
          className="ml-auto max-w-24 shrink-0 text-right text-xs text-zinc-500 dark:text-zinc-400"
        >
          {category}
        </Text>
      </Link>
    </li>
  )
}
