'use client'

import { motion } from 'motion/react'
import { type StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Text } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

/**
 * Project data structure for the minimal list layout
 */
type ProjectListItemProps = {
  /** Project name - displayed prominently */
  name: string
  /** Brief description - shown on expand */
  description: string
  /** Category label - displayed right-aligned */
  category: string
  /** External link */
  href: string
  /** Project logo */
  logo: StaticImageData
  /** Animation delay index for staggered entrance */
  index?: number
}

/**
 * Minimal list-style project item with Motion-powered hover/focus accordion.
 *
 * Design inspired by Linear and Henry's Portfolio - typography-first approach
 * with generous whitespace and smooth spring animations.
 *
 * Features:
 * - Staggered entrance animation on page load
 * - Spring physics for natural accordion expand/collapse
 * - Height: auto animation (Motion's killer feature)
 * - Arrow animation with spring physics
 *
 * @param name - Project name (large, bold typography)
 * @param description - Brief description (revealed on hover/focus)
 * @param category - Category label (right-aligned, muted)
 * @param href - Link to project
 * @param logo - Project icon
 * @param index - For staggered animation delays
 *
 * @example
 * <ProjectListItem
 *   name="GitBox"
 *   description="Manage GitHub repositories in Kanban format."
 *   category="Web App"
 *   href="https://gitbox.vercel.app"
 *   logo={gitLogo}
 *   index={0}
 * />
 */
export function ProjectListItem({
  name,
  description,
  category,
  href,
  logo,
  index = 0,
}: ProjectListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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
        // Border
        'border-b border-zinc-200/60 dark:border-zinc-700/40',
        'hover:border-zinc-300/80 dark:hover:border-zinc-600/60'
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
          'rounded-sm'
        )}
        aria-label={`${name} - ${category} (opens in new tab)`}
      >
        {/* Main row: Logo + Name | Category + Arrow */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo + Name */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            {/* Logo */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center',
                'rounded-xl bg-zinc-100 dark:bg-zinc-800',
                'ring-1 ring-zinc-200/50 dark:ring-zinc-700/50',
                isExpanded && 'ring-zinc-300 dark:ring-zinc-600'
              )}
            >
              <Image
                src={logo}
                alt=""
                className="h-6 w-6 sm:h-7 sm:w-7"
                unoptimized
              />
            </div>

            {/* Project Name */}
            <Text
              as="h2"
              variant="h3"
              className="text-zinc-900 dark:text-zinc-50"
            >
              {name}
            </Text>
          </div>

          {/* Right: Category + Arrow */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-6">
            {/* Category Label */}
            <Text
              as="span"
              variant="caption"
              color="muted"
              transform="uppercase"
              className="hidden sm:block text-zinc-400 dark:text-zinc-500"
            >
              {category}
            </Text>

            {/* Arrow Icon with Motion spring animation */}
            <motion.svg
              animate={{ x: isExpanded ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'h-5 w-5',
                isExpanded
                  ? 'text-teal-500 dark:text-teal-400'
                  : 'text-zinc-400 dark:text-zinc-500'
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

        {/* Expandable Content with Motion height animation */}
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
          <div className="pt-6 pl-16 sm:pl-[72px]">
            {/* Mobile category */}
            <Text
              as="span"
              variant="overline"
              color="muted"
              className="mb-2 block sm:hidden text-zinc-400 dark:text-zinc-500"
            >
              {category}
            </Text>

            {/* Description */}
            <Text variant="body" color="muted" className="max-w-2xl">
              {description}
            </Text>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
