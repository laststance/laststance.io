import type { Meta, StoryObj } from '@storybook/nextjs-vite'


import electronLogo from '@/images/logos/icons8-electron-48.png'
import { FEATURED_PROJECTS } from '@/lib/projects'

import { FeaturedProjectListItem } from './FeaturedProjectListItem'

const meta: Meta<typeof FeaturedProjectListItem> = {
  title: 'components/FeaturedProjectListItem',
  component: FeaturedProjectListItem,
  parameters: {
    layout: 'padded',
    // Under the Storybook+Vitest test runner, axe-core reports colors that
    // don't match the production cascade — surfacing spurious low-contrast
    // failures on rows that read correctly in both themes when rendered by
    // Next.js. We silence only the color-contrast rule rather than turning
    // a11y off wholesale; visual verification happens in the manual Storybook
    // UI and the Playwright/Argos suite.
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
    docs: {
      description: {
        component: `
Large, hover-expandable project row used by \`/projects\` Featured section.

**Status label visual treatment (DESIGN.md §7):**
- \`Active\` consumes the teal accent token (the single project getting daily polish).
- \`Daily tool\` / \`Experiment\` / \`Maintained\` / \`Paused\` all stay zinc-400/500 muted.
- All five share \`font-mono uppercase tracking-wider\` so the typography reads as one
  editorial system; only color separates them.

**Motion budget (DESIGN.md §6):**
- Entrance: \`opacity + y: 20→0\` with \`index * 0.05s\` stagger.
- Hover/focus: spring accordion reveals \`description\`; arrow translates +4px.

Each variant below is a single row so you can see the per-status treatment in
isolation. \`FullList\` renders the actual seven \`FEATURED_PROJECTS\` for a
visual integration check.
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['Active', 'Daily tool', 'Experiment', 'Maintained', 'Paused'],
      description: 'Author-decided 1-of-5 status (DESIGN.md §7).',
    },
    index: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Stagger entrance delay index (delay = index × 0.05s).',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FeaturedProjectListItem>

const baseArgs = {
  name: 'Skills Desktop',
  description:
    'Visualize installed Skills and symlink status across AI agents. GUI for managing skills with 21 AI agents support and 26 themes.',
  category: 'Desktop App',
  href: 'https://skills-desktop.vercel.app/',
  logo: electronLogo,
  index: 0,
} as const

/**
 * `Active` is the only status that consumes the accent token. Reserved for the
 * one project currently receiving pixel-level polish.
 */
export const StatusActive: Story = {
  args: { ...baseArgs, status: 'Active' },
}

/**
 * `Daily tool` — author uses it in their own workflow. Zinc-muted.
 */
export const StatusDailyTool: Story = {
  args: { ...baseArgs, status: 'Daily tool' },
}

/**
 * `Experiment` — proving an idea; may pivot or stop without notice.
 */
export const StatusExperiment: Story = {
  args: { ...baseArgs, status: 'Experiment' },
}

/**
 * `Maintained` — stable; bugfixes only, no new features planned.
 */
export const StatusMaintained: Story = {
  args: { ...baseArgs, status: 'Maintained' },
}

/**
 * `Paused` — deliberately on hold (not deprecated). Author may resume later.
 * No live project currently carries this status; this story exists so the
 * 5th vocabulary slot has a visual reference.
 */
export const StatusPaused: Story = {
  args: { ...baseArgs, status: 'Paused' },
}

/**
 * The real seven `FEATURED_PROJECTS` rendered top-to-bottom. Use this to
 * eyeball whether the `Active`-only-accent rule still reads as hierarchy when
 * statuses are mixed in author-curated order.
 */
export const FullList: Story = {
  decorators: [
    () => (
      <div className="mx-auto max-w-3xl">
        <div className="border-t border-zinc-200/60 dark:border-zinc-700/40" />
        {FEATURED_PROJECTS.map((project, projectIndex) => (
          <FeaturedProjectListItem
            key={project.name}
            name={project.name}
            description={project.description}
            category={project.category}
            href={project.href}
            logo={project.logo}
            status={project.status}
            index={projectIndex}
          />
        ))}
      </div>
    ),
  ],
}
