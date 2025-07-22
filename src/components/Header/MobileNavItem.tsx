import { Popover } from '@headlessui/react'
import Link from 'next/link'

export function MobileNavItem({
  children,
  href,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Link> & {
  children: React.ReactNode
}) {
  return (
    <li>
      <Popover.Button as={Link} href={href} {...rest} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  )
}
