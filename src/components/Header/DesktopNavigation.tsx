import { NavItem } from './NavItem'

export function DesktopNavigation(
  props: React.ComponentPropsWithoutRef<'nav'>,
) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/articles">Articles</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="https://nsx.malloc.tokyo/" target="_blank">
          ReadList
        </NavItem>
        <NavItem href="/uses">Uses</NavItem>
        <NavItem href="/keybinds">Keybinds</NavItem>
      </ul>
    </nav>
  )
}
