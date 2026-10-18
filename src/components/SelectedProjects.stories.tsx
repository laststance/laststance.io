import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getPublishedProjects } from '@/lib/projects'

import { SelectedProjects } from './SelectedProjects'

const meta: Meta<typeof SelectedProjects> = {
  title: 'components/SelectedProjects',
  component: SelectedProjects,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof SelectedProjects>
export const Published: Story = {
  args: { projects: getPublishedProjects().selected },
}
export const Empty: Story = { args: { projects: [] } }
