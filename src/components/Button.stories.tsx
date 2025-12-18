import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Versatile button component that supports both button and link variants with primary and secondary styling options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
    },
    href: {
      control: 'text',
      description: 'If provided, renders as a Next.js Link',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (button only)',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const AsLink: Story = {
  args: {
    variant: 'primary',
    href: '/about',
    children: 'Link Button',
  },
}

export const SecondaryAsLink: Story = {
  args: {
    variant: 'secondary',
    href: '/projects',
    children: 'View Projects',
  },
}

export const VariantComparison: Story = {
  decorators: [
    () => (
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    ),
  ],
}

export const AllStates: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            As Button
          </h3>
          <div className="flex gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            As Link
          </h3>
          <div className="flex gap-4">
            <Button variant="primary" href="/example">
              Primary Link
            </Button>
            <Button variant="secondary" href="/example">
              Secondary Link
            </Button>
          </div>
        </div>
      </div>
    ),
  ],
}
