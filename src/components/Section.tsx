import { useId } from 'react'

import { Text } from '@/components/ui/primitives'

export function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const id = useId()

  return (
    <section
      aria-labelledby={id}
      className="content-column border-t border-zinc-200 pt-6 dark:border-zinc-800"
    >
      <div className="reference-grid">
        <Text as="h2" variant="caption" weight="semibold" id={id}>
          {title}
        </Text>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
