import Link from 'next/link'
import type { ComponentProps } from 'react'

import { ContainerInner, ContainerOuter } from '@/components/Container'

const NavLink: React.FC<ComponentProps<'a'>> = ({
  children,
  href,
  ...rest
}) => (
  <Link
    {...rest}
    href={href}
    className="transition hover:text-teal-500 dark:hover:text-teal-400"
  >
    {children}
  </Link>
)

export function Footer() {
  return (
    <footer className="mt-16 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="https://nsx.malloc.tokyo/" target="_blank">
                  ReadList
                </NavLink>
                <NavLink href="/uses">Uses</NavLink>
                <NavLink href="/keybinds">Keybinds</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Laststance.io. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
