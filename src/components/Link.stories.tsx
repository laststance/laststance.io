import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'A styled wrapper around Next.js Link component with hover transition effects. Used for internal navigation throughout the site.',
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
}

export default meta

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: '/about',
    children: 'About Me',
  },
}

export const ExternalLink: Story = {
  args: {
    href: 'https://github.com/laststance',
    children: 'View on GitHub',
  },
}

export const InParagraph: Story = {
  decorators: [
    () => (
      <p className="text-zinc-600 dark:text-zinc-400">
        Check out my <Link href="/projects">projects page</Link> to see what
        I've been working on, or read some of my{' '}
        <Link href="/articles">recent articles</Link> about web development.
      </p>
    ),
  ],
}

export const Navigation: Story = {
  decorators: [
    () => (
      <nav className="flex gap-6 text-sm">
        <Link href="/about">About</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/uses">Uses</Link>
      </nav>
    ),
  ],
}

export const InList: Story = {
  decorators: [
    () => (
      <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
        <li>
          → <Link href="/articles/first-post">First Blog Post</Link>
        </li>
        <li>
          → <Link href="/articles/second-post">Second Blog Post</Link>
        </li>
        <li>
          → <Link href="/articles/third-post">Third Blog Post</Link>
        </li>
      </ul>
    ),
  ],
}
