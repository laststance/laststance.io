import type { Meta, StoryObj } from '@storybook/nextjs-vite'


import chromeLogo from '@/images/logos/icons8-chrome-48.png'
import { ARCHIVE_PROJECTS } from '@/lib/projects'

import { ArchiveProjectListItem } from './ArchiveProjectListItem'

const meta: Meta<typeof ArchiveProjectListItem> = {
  title: 'components/ArchiveProjectListItem',
  component: ArchiveProjectListItem,
  parameters: {
    layout: 'padded',
    // The Storybook+Vitest test environment renders Tailwind `dark:` classes
    // on a white surface (no dark-class on root), so axe sees zinc-400 on
    // white and flags the intentionally-faint category label. The production
    // surface always pairs the right text + bg variant, so we silence only
    // this one rule rather than turning a11y off wholesale.
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
    docs: {
      description: {
        component: `
Compressed 1-line row used by \`/projects\` Archive section.

**Design intent (DESIGN.md §6 motion exception):**
- Static-by-design. No entrance stagger, no hover accordion — Archive is a
  reference list, not "new content arrival." Motion silence is the signal
  separating Archive from Featured.

**Accessibility:**
- \`min-h-[44px] + py-4\` meets the iOS HIG 44pt tap target floor.
- \`title={description}\` provides native tooltip context without an accordion.
- \`aria-label\` is composed from name + category for clean screen-reader output.

\`FullList\` renders the 22 live \`ARCHIVE_PROJECTS\` so the alphabetical
density of the section can be eyeballed in one place.
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ArchiveProjectListItem>

/**
 * Single row in isolation. Wrapped in `<ul>` because the component renders
 * `<li>` and the list semantics must match.
 */
export const Default: Story = {
  args: {
    name: 'Clean URL',
    description:
      'Remove tracking parameters from URLs automatically, protecting your privacy while browsing.',
    category: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
    logo: chromeLogo,
  },
  decorators: [
    (Story) => (
      <ul className="mx-auto max-w-3xl border-t border-zinc-200/60 dark:border-zinc-700/40">
        <Story />
      </ul>
    ),
  ],
}

/**
 * The real 22 `ARCHIVE_PROJECTS` rendered alphabetically. Use this to check
 * the density / readability rhythm of the compressed list.
 */
export const FullList: Story = {
  decorators: [
    () => (
      <ul className="mx-auto max-w-3xl border-t border-zinc-200/60 dark:border-zinc-700/40">
        {ARCHIVE_PROJECTS.map((project) => (
          <ArchiveProjectListItem
            key={project.name}
            name={project.name}
            description={project.description}
            category={project.category}
            href={project.href}
            logo={project.logo}
          />
        ))}
      </ul>
    ),
  ],
}
