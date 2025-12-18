import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Section } from './Section'

const meta: Meta<typeof Section> = {
  title: 'components/Section',
  component: Section,
  parameters: {
    docs: {
      description: {
        component:
          'A section component with a title heading and content area, designed for use in page layouts like the About or Uses pages.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The section heading text',
    },
    children: {
      control: 'text',
      description: 'Section content',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Section>

export const Default: Story = {
  args: {
    title: 'Section Title',
    children: (
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the content of the section. It appears in a grid layout with the
        title on the left (on medium screens and up) and the content spanning
        the remaining columns.
      </p>
    ),
  },
}

export const Work: Story = {
  args: {
    title: 'Work',
    children: (
      <div className="space-y-4">
        <p className="text-zinc-600 dark:text-zinc-400">
          I'm a software engineer specializing in building exceptional digital
          experiences. Currently focused on building accessible, human-centered
          products.
        </p>
        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>• Full-stack development with TypeScript</li>
          <li>• React & Next.js applications</li>
          <li>• Design system architecture</li>
        </ul>
      </div>
    ),
  },
}

export const Skills: Story = {
  args: {
    title: 'Skills',
    children: (
      <div className="flex flex-wrap gap-2">
        {[
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'Tailwind CSS',
          'PostgreSQL',
        ].map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300"
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
}

export const Uses: Story = {
  args: {
    title: 'Development tools',
    children: (
      <ul className="space-y-4">
        {[
          {
            name: 'Visual Studio Code',
            description: 'My go-to code editor with vim keybindings.',
          },
          {
            name: 'iTerm2',
            description: 'A better terminal for macOS.',
          },
          {
            name: 'Figma',
            description: 'For all things design and prototyping.',
          },
        ].map((item) => (
          <li key={item.name}>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
              {item.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    ),
  },
}

export const MultipleSections: Story = {
  decorators: [
    () => (
      <div className="space-y-16">
        <Section title="About">
          <p className="text-zinc-600 dark:text-zinc-400">
            A brief introduction about myself and my work.
          </p>
        </Section>
        <Section title="Experience">
          <p className="text-zinc-600 dark:text-zinc-400">
            Professional experience and career highlights.
          </p>
        </Section>
        <Section title="Contact">
          <p className="text-zinc-600 dark:text-zinc-400">
            How to get in touch with me.
          </p>
        </Section>
      </div>
    ),
  ],
}
