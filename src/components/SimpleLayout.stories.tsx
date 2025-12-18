import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SimpleLayout } from './SimpleLayout'

const meta: Meta<typeof SimpleLayout> = {
  title: 'components/SimpleLayout',
  component: SimpleLayout,
  parameters: {
    docs: {
      description: {
        component:
          'A simple page layout component with a large title and introductory text. Used for pages like About, Uses, and Projects.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The page title displayed in large heading',
    },
    intro: {
      control: 'text',
      description: 'Introductory paragraph text below the title',
    },
    children: {
      description: 'Optional content rendered below the header',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SimpleLayout>

export const Default: Story = {
  args: {
    title: 'Page Title',
    intro:
      'This is the introductory text that appears below the title. It provides context and sets expectations for the page content.',
  },
}

export const WithChildren: Story = {
  args: {
    title: 'Projects',
    intro:
      'A collection of open source projects and experiments built with modern web technologies.',
  },
  decorators: [
    () => (
      <SimpleLayout
        title="Projects"
        intro="A collection of open source projects and experiments built with modern web technologies."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {['Project A', 'Project B', 'Project C'].map((project) => (
            <div
              key={project}
              className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {project}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Project description goes here.
              </p>
            </div>
          ))}
        </div>
      </SimpleLayout>
    ),
  ],
}

export const AboutPage: Story = {
  args: {
    title: 'About Me',
    intro:
      "I'm a software engineer based in Tokyo, Japan. I focus on building open source tools and exploring modern web development practices.",
  },
}

export const UsesPage: Story = {
  args: {
    title: 'Uses',
    intro:
      'A comprehensive list of hardware, software, and tools I use daily for software development and productivity.',
  },
}

export const WithReactNodeTitle: Story = {
  decorators: [
    () => (
      <SimpleLayout
        title={
          <span>
            Hello{' '}
            <span className="text-teal-500 dark:text-teal-400">World</span>
          </span>
        }
        intro="The title prop can accept React nodes for custom styling and formatting."
      />
    ),
  ],
}
