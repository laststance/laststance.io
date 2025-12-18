import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          'Site footer component with navigation links and copyright notice. Features responsive layout that stacks on mobile.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}

export const InContext: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
        <main className="flex-1 p-8">
          <p className="text-zinc-600 dark:text-zinc-400">
            Page content would appear here...
          </p>
        </main>
        <Story />
      </div>
    ),
  ],
}
