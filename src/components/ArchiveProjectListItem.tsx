import Image from 'next/image'
import Link from 'next/link'

import { Text } from '@/components/ui/primitives'
import { type ArchiveProject } from '@/lib/projects'

/**
 * Archive project row — compressed 1-line layout, no expand/motion.
 *
 * Design intent (DESIGN.md §6 motion exception): Archive is a reference list,
 * not "new content arrival" — so no entrance stagger, no hover accordion.
 * Static-by-design keeps the visual hierarchy with Featured intact.
 *
 * Accessibility:
 * - `min-h-[44px]` + `py-4` meets the iOS HIG 44pt tap target floor.
 * - `title={description}` provides hover/tooltip context without an accordion.
 * - `aria-label` is composed from name + category for clear screen-reader output.
 *
 * @param name - Project name
 * @param description - Brief description (surfaces only via native title tooltip)
 * @param category - Category label (right-aligned, mono caption)
 * @param href - External link
 * @param logo - Project icon (small, reduced opacity)
 *
 * @example
 * <ArchiveProjectListItem
 *   name="Clean URL"
 *   description="Remove tracking parameters..."
 *   category="Chrome Extension"
 *   href="https://chromewebstore.google.com/..."
 *   logo={chromeLogo}
 * />
 */
export function ArchiveProjectListItem({
  name,
  description,
  category,
  href,
  logo,
}: ArchiveProject) {
  return (
    <li className="border-b border-zinc-200/40 dark:border-zinc-800/40">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={description}
        aria-label={`${name} - ${category} (opens in new tab)`}
        className="group flex min-h-[44px] items-center gap-3 py-4 outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:gap-4 dark:focus-visible:ring-offset-zinc-900"
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
          className="min-w-0 truncate text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-50"
        >
          {name}
        </Text>
        <Text
          as="span"
          variant="caption"
          color="muted"
          transform="uppercase"
          className="ml-auto shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-500"
        >
          {category}
        </Text>
      </Link>
    </li>
  )
}
