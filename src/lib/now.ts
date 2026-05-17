/**
 * A single "what I'm focused on right now" entry rendered by `NowPanel`.
 *
 * Author-written, surgical. Replaces the old GitHub activity feed with present
 * intent rather than past commits. Inspired by https://sive.rs/now2.
 *
 * @example
 * const item: NowItem = {
 *   title: 'laststance.io rebuild',
 *   blurb: 'Walking-skeleton refresh — replacing the GitHub feed.',
 * }
 */
export type NowItem = {
  /** Project or topic name (1-4 words). */
  title: string
  /** One sentence describing the current focus (max ~80 chars). */
  blurb: string
  /** Optional canonical link — external (https://…) or internal route. */
  href?: string
}

/**
 * Author-maintained list of current focus items. Keep between 1 and 3 entries.
 *
 * If this array is empty, `NowPanel` renders nothing (defensive null return)
 * rather than printing an empty heading. Per DESIGN.md §7, the section is
 * "static by design" — no motion, no fetch, no skeleton.
 */
export const NOW_ITEMS: readonly NowItem[] = [
  {
    title: 'laststance.io rebuild',
    blurb:
      'Walking-skeleton refresh — replacing the GitHub feed with author-written context.',
  },
  {
    title: 'OSS at @laststance',
    blurb: 'Small TypeScript libraries and tooling under the laststance org.',
    href: 'https://github.com/laststance',
  },
]

/** Last updated date in `YYYY-MM-DD`. Bump when editing `NOW_ITEMS`. */
export const NOW_UPDATED_AT = '2026-05-17'
