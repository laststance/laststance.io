import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ThemeToggle } from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'components/Header/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component:
          'Theme toggle button that switches between light and dark modes. Uses next-themes for theme management and displays sun/moon icons based on current theme.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {}

export const InHeader: Story = {
  decorators: [
    (Story) => (
      <header className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <span className="text-zinc-600 dark:text-zinc-400">Site Logo</span>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span>About</span>
            <span>Projects</span>
          </nav>
          <Story />
        </div>
      </header>
    ),
  ],
}

export const WithLabel: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Toggle theme:
        </span>
        <Story />
      </div>
    ),
  ],
}
