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
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <Text as="h2" variant="caption" weight="semibold" id={id}>
          {title}
        </Text>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}
