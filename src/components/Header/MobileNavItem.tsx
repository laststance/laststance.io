import { Popover } from '@headlessui/react'
import Link from 'next/link'

export function MobileNavItem({
  children,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'as'> & {
  children: React.ReactNode
}) {
  return (
    <li>
      <Popover.Button
        as={Link}
        {...rest}
        className="flex min-h-11 items-center py-2"
      >
        {children}
      </Popover.Button>
    </li>
  )
}
