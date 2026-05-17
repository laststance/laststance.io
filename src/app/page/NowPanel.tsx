import { Text } from '@/components/ui/primitives'
import { NOW_ITEMS, NOW_UPDATED_AT } from '@/lib/now'

/**
 * Static "Now" section — author-written current focus, replacing the old
 * GitHub activity feed. No fetch, no Suspense, no motion (per DESIGN.md §6
 * "static by design" exception clause). Updates by hand on edits to
 * `src/lib/now.ts`.
 *
 * Returns `null` if `NOW_ITEMS` is empty so the layout collapses cleanly
 * rather than rendering a bare heading.
 */
export function NowPanel() {
  if (NOW_ITEMS.length === 0) return null

  return (
    <section
      data-react-component="NowPanel"
      className="max-xs:w-85 max-sm:w-90 md:w-95 max-lg:m-auto"
    >
      <header className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Now
        </h2>
        <Text variant="caption" color="muted" className="font-mono">
          Updated {NOW_UPDATED_AT}
        </Text>
      </header>
      <ol className="space-y-8">
        {NOW_ITEMS.map((item) => (
          <NowListItem key={item.title} item={item} />
        ))}
      </ol>
    </section>
  )
}

/**
 * Single row in the Now list. Renders an anchor when `href` is set so the
 * teal hover state from DESIGN.md §7 (Active = teal) signals the link.
 * Otherwise renders plain text — no false affordance for non-link items.
 */
function NowListItem({ item }: { item: (typeof NOW_ITEMS)[number] }) {
  const isExternal = item.href?.startsWith('http') ?? false

  if (!item.href) {
    return (
      <li className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
        <Text as="h3" variant="h4">
          {item.title}
        </Text>
        <Text variant="body" color="muted" className="mt-1">
          {item.blurb}
        </Text>
      </li>
    )
  }

  return (
    <li className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
      <a
        href={item.href}
        className="group block"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <Text
          as="h3"
          variant="h4"
          className="transition-colors group-hover:text-teal-500"
        >
          {item.title}
        </Text>
        <Text variant="body" color="muted" className="mt-1">
          {item.blurb}
        </Text>
      </a>
    </li>
  )
}
