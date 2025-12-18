import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'components/Header/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Avatar component that links to the home page. Displays the site logo with optional large size variant.',
      },
    },
  },
  argTypes: {
    large: {
      control: 'boolean',
      description: 'Whether to render the large variant (64px vs 36px)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {},
}

export const Large: Story = {
  args: {
    large: true,
  },
}

export const SizeComparison: Story = {
  decorators: [
    () => (
      <div className="flex items-center gap-6">
        <div className="text-center">
          <Avatar />
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Default (36px)
          </p>
        </div>
        <div className="text-center">
          <Avatar large />
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Large (64px)
          </p>
        </div>
      </div>
    ),
  ],
}

export const WithCustomClassName: Story = {
  args: {
    className: 'ring-2 ring-teal-500 ring-offset-2',
  },
}

export const InHeader: Story = {
  decorators: [
    () => (
      <header className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <Avatar />
        <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <span>About</span>
          <span>Projects</span>
          <span>Articles</span>
        </nav>
      </header>
    ),
  ],
}
