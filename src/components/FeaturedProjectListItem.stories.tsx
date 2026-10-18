import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FEATURED_PROJECTS } from '@/lib/projects'

import { FeaturedProjectListItem } from './FeaturedProjectListItem'

const meta: Meta<typeof FeaturedProjectListItem> = {
  title: 'components/FeaturedProjectListItem',
  component: FeaturedProjectListItem,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof FeaturedProjectListItem>
export const Default: Story = { args: FEATURED_PROJECTS[0] }
export const LongName: Story = { args: FEATURED_PROJECTS[3] }
export const FullList: Story = {
  render: () => (
    <div>
      {FEATURED_PROJECTS.map((project) => (
        <FeaturedProjectListItem key={project.name} {...project} />
      ))}
    </div>
  ),
}
