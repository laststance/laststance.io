import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NavItem } from './NavItem'

const meta: Meta<typeof NavItem> = {
  title: 'components/Header/NavItem',
  component: NavItem,
  parameters: {
    docs: {
      description: {
        component:
          'Navigation item component with active state detection based on current pathname. Features a teal underline indicator for active state.',
      },
    },
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Navigation destination URL',
    },
    children: {
      control: 'text',
      description: 'Link text content',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <nav>
        <ul className="flex gap-1">
          <Story />
        </ul>
      </nav>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof NavItem>

export const Default: Story = {
  args: {
    href: '/projects',
    children: 'Projects',
  },
}

export const Active: Story = {
  args: {
    href: '/about',
    children: 'About',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
}

export const Navigation: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/projects',
      },
    },
  },
  decorators: [
    () => (
      <nav className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
        <ul className="flex gap-1">
          <NavItem href="/about">About</NavItem>
          <NavItem href="/articles">Articles</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/uses">Uses</NavItem>
        </ul>
      </nav>
    ),
  ],
}

export const AllStates: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-zinc-500">
            Inactive state (current path: /about)
          </p>
          <nav className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <ul className="flex gap-1">
              <NavItem href="/projects">Projects</NavItem>
            </ul>
          </nav>
        </div>
        <div>
          <p className="mb-2 text-sm text-zinc-500">
            Active state (current path: /about)
          </p>
          <nav className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <ul className="flex gap-1">
              <NavItem href="/about">About</NavItem>
            </ul>
          </nav>
        </div>
      </div>
    ),
  ],
}
