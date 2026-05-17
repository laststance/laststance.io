'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Text } from '@/components/ui/primitives'
import { type FeaturedProject } from '@/lib/projects'
import { cn } from '@/lib/utils'

type FeaturedProjectListItemProps = FeaturedProject & {
  /** Stagger entrance animation index (Featured 0..6) */
  index?: number
}

/**
 * Featured project row — large expanded layout with author-decided status label.
 *
 * Visual treatment per DESIGN.md §7 (Status Label Vocabulary):
 * - `Active` → teal accent (the one project receiving daily polish)
 * - Other 4 statuses → zinc-400/500 muted
 * - All statuses share `font-mono uppercase tracking-wider` for editorial uniformity
 *
 * Motion budget per DESIGN.md §6:
 * - Staggered entrance (0.05s × index)
 * - Spring-physics arrow + accordion height on hover/focus
 *
 * @param name - Project name
 * @param description - Brief description (revealed on hover/focus)
 * @param category - Category label (right-aligned, muted)
 * @param href - External link to the project
 * @param logo - Project icon
 * @param status - Author-decided 1-of-5 status label (DESIGN.md §7)
 * @param index - Stagger animation delay index
 *
 * @example
 * <FeaturedProjectListItem
 *   name="Skills Desktop"
 *   description="Visualize installed Skills..."
 *   category="Desktop App"
 *   href="https://skills-desktop.vercel.app/"
 *   logo={electronLogo}
 *   status="Active"
 *   index={0}
 * />
 */
export function FeaturedProjectListItem({
  name,
  description,
  category,
  href,
  logo,
  status,
  index = 0,
}: FeaturedProjectListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Only `Active` consumes the accent token; others stay muted.
  // Single-accent pattern preserves editorial uniformity while signaling priority.
  const isActiveStatus = status === 'Active'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      className={cn(
        'relative',
        'border-b border-zinc-200/60 dark:border-zinc-700/40',
        'hover:border-zinc-300/80 dark:hover:border-zinc-600/60',
      )}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        className={cn(
          'block py-10 sm:py-12 md:py-16',
          'outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-4',
          'focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900',
          'rounded-sm',
        )}
        aria-label={`${name} - ${status}, ${category} (opens in new tab)`}
      >
        {/* Main row: Logo + Name | Status + Category + Arrow */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center',
                'rounded-xl bg-zinc-100 dark:bg-zinc-800',
                'ring-1 ring-zinc-200/50 dark:ring-zinc-700/50',
                isExpanded && 'ring-zinc-300 dark:ring-zinc-600',
              )}
            >
              <Image
                src={logo}
                alt=""
                className="h-6 w-6 sm:h-7 sm:w-7"
                unoptimized
              />
            </div>

            <Text
              as="h2"
              variant="h3"
              className="text-zinc-900 dark:text-zinc-50"
            >
              {name}
            </Text>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
            {/* Status label — Active only consumes the accent token */}
            <Text
              as="span"
              variant="caption"
              color={isActiveStatus ? 'accent' : undefined}
              transform="uppercase"
              className={cn(
                'hidden font-mono tracking-wider sm:inline-block',
                !isActiveStatus && 'text-zinc-400 dark:text-zinc-500',
              )}
            >
              {status}
            </Text>

            <Text
              as="span"
              variant="caption"
              color="muted"
              transform="uppercase"
              className="hidden text-zinc-400 sm:block dark:text-zinc-500"
            >
              {category}
            </Text>

            <motion.svg
              animate={{ x: isExpanded ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'h-5 w-5',
                isExpanded
                  ? 'text-teal-500 dark:text-teal-400'
                  : 'text-zinc-400 dark:text-zinc-500',
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </div>
        </div>

        {/* Expandable description with spring height animation */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            height: { type: 'spring', stiffness: 500, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{ overflow: 'hidden' }}
          aria-hidden={!isExpanded}
        >
          <div className="pt-6 pl-16 sm:pl-18">
            {/* Mobile-only: status + category stacked above description */}
            <div className="mb-2 flex items-center gap-3 sm:hidden">
              <Text
                as="span"
                variant="overline"
                color={isActiveStatus ? 'accent' : undefined}
                className={cn(
                  'font-mono',
                  !isActiveStatus && 'text-zinc-400 dark:text-zinc-500',
                )}
              >
                {status}
              </Text>
              <Text
                as="span"
                variant="overline"
                color="muted"
                className="text-zinc-400 dark:text-zinc-500"
              >
                {category}
              </Text>
            </div>

            <Text variant="body" color="muted" className="max-w-2xl">
              {description}
            </Text>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
