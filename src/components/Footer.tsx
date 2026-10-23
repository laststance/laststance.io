import Link from 'next/link'
import type { ComponentProps } from 'react'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import { HStack, Text } from '@/components/ui/primitives'

const NavLink: React.FC<ComponentProps<typeof Link>> = ({
  children,
  href,
  ...rest
}) => (
  <Link
    {...rest}
    href={href}
    className="inline-flex min-h-11 min-w-11 items-center justify-center transition hover:text-teal-500 dark:hover:text-teal-400"
  >
    {children}
  </Link>
)

export function Footer() {
  return (
    <footer className="mt-(--footer-gap) flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <HStack
                gap={6}
                wrap
                align="center"
                className="justify-center text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/uses">Uses</NavLink>
                <NavLink href="/keybinds">Keybinds</NavLink>
              </HStack>
              <Text
                as="p"
                variant="caption"
                className="text-zinc-600 dark:text-zinc-400"
              >
                &copy; {new Date().getFullYear()} Laststance.io. All rights
                reserved.
              </Text>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
