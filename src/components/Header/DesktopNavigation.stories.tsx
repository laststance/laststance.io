import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DesktopNavigation } from './DesktopNavigation'

const meta: Meta<typeof DesktopNavigation> = {
  title: 'components/Header/DesktopNavigation',
  component: DesktopNavigation,
  parameters: {
    docs: {
      description: {
        component:
          'Desktop navigation bar with pill-shaped background and blur effect. Contains main site navigation links. Hidden on mobile devices.',
      },
    },
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DesktopNavigation>

export const Default: Story = {}

export const WithAboutActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
}

export const WithArticlesActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/articles',
      },
    },
  },
}

export const WithProjectsActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/projects',
      },
    },
  },
}

export const InHeader: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/projects',
      },
    },
  },
  decorators: [
    (Story) => (
      <header className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <Story />
        <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </header>
    ),
  ],
}
