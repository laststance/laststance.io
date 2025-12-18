import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ArrowLeftIcon } from './ArrowLeftIcon'

const meta: Meta<typeof ArrowLeftIcon> = {
  title: 'components/ArrowLeftIcon',
  component: ArrowLeftIcon,
  parameters: {
    docs: {
      description: {
        component:
          'A left arrow icon used for back navigation. Accepts standard SVG props for customization.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ArrowLeftIcon>

export const Default: Story = {
  render: () => (
    <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 dark:stroke-zinc-400" />
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <ArrowLeftIcon className="h-3 w-3 stroke-zinc-500" />
        <p className="mt-2 text-xs text-zinc-500">12px</p>
      </div>
      <div className="text-center">
        <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500" />
        <p className="mt-2 text-xs text-zinc-500">16px</p>
      </div>
      <div className="text-center">
        <ArrowLeftIcon className="h-5 w-5 stroke-zinc-500" />
        <p className="mt-2 text-xs text-zinc-500">20px</p>
      </div>
      <div className="text-center">
        <ArrowLeftIcon className="h-6 w-6 stroke-zinc-500" />
        <p className="mt-2 text-xs text-zinc-500">24px</p>
      </div>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <button className="group flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
      <ArrowLeftIcon className="h-4 w-4 stroke-zinc-400 transition group-hover:stroke-zinc-600 dark:group-hover:stroke-zinc-300" />
      <span>Go back</span>
    </button>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="max-w-lg">
      <button className="group mb-8 flex items-center text-sm font-medium text-zinc-400 transition hover:text-teal-500 dark:text-zinc-500 dark:hover:text-teal-500">
        <ArrowLeftIcon className="mr-2 h-4 w-4 stroke-current" />
        Back to articles
      </button>
      <article>
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Article Title
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          This demonstrates how the ArrowLeftIcon is typically used in a back
          navigation context within an article page.
        </p>
      </article>
    </div>
  ),
}

export const ColorVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <ArrowLeftIcon className="h-5 w-5 stroke-zinc-500" />
      <ArrowLeftIcon className="h-5 w-5 stroke-teal-500" />
      <ArrowLeftIcon className="h-5 w-5 stroke-blue-500" />
      <ArrowLeftIcon className="h-5 w-5 stroke-red-500" />
      <ArrowLeftIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
    </div>
  ),
}
