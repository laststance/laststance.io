import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Design System/Primitives/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `
The Text component is the foundation for all typography in the design system.

## Typography Scale (Increased for Readability)

| Variant | Size (Desktop) | Size (Mobile) | Use Case |
|---------|---------------|---------------|----------|
| display | 48px | 40px | Hero sections |
| h1 | 40px | 32px | Page titles |
| h2 | 32px | 24px | Section titles |
| h3 | 24px | 20px | Subsection titles |
| h4 | 20px | 18px | Card titles |
| bodyLarge | 20px | 18px | Emphasized content |
| body | 18px | 16px | Default text |
| bodySmall | 16px | 14px | Secondary content |
| caption | 14px | 14px | Labels, meta info |
| overline | 12px | 12px | Category labels |
| code | 16px | 14px | Code snippets |

## Accessibility

All text sizes meet WCAG 2.2 AA contrast requirements. The minimum body text is 16px (mobile) to ensure readability.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'h1',
        'h2',
        'h3',
        'h4',
        'bodyLarge',
        'body',
        'bodySmall',
        'caption',
        'overline',
        'code',
      ],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'accent',
        'inherit',
        'inverse',
        'success',
        'warning',
        'error',
      ],
      description: 'Text color',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    truncate: {
      control: 'boolean',
      description: 'Single line truncation',
    },
    clamp: {
      control: 'select',
      options: ['none', 1, 2, 3, 4],
      description: 'Multi-line truncation',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    variant: 'body',
    children: 'This is body text at 18px for improved readability.',
  },
}

export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Display Heading',
  },
}

export const Headings: Story = {
  decorators: [
    () => (
      <div className="space-y-6">
        <Text variant="display">Display - 48px</Text>
        <Text variant="h1">Heading 1 - 40px</Text>
        <Text variant="h2">Heading 2 - 32px</Text>
        <Text variant="h3">Heading 3 - 24px</Text>
        <Text variant="h4">Heading 4 - 20px</Text>
      </div>
    ),
  ],
}

export const BodyVariants: Story = {
  decorators: [
    () => (
      <div className="space-y-6">
        <div>
          <Text variant="caption" color="muted" className="mb-1">
            Body Large (20px)
          </Text>
          <Text variant="bodyLarge">
            This is body large text, used for emphasized content that needs to
            stand out from the regular body text.
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-1">
            Body (18px - Default)
          </Text>
          <Text variant="body">
            This is the default body text at 18px. Increased from the standard
            16px for better readability. This size is recommended for all main
            content.
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-1">
            Body Small (16px)
          </Text>
          <Text variant="bodySmall">
            This is body small text at 16px. Use for secondary content or areas
            where space is limited.
          </Text>
        </div>
      </div>
    ),
  ],
}

export const ColorVariants: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <Text variant="body" color="default">
          Default - Primary content color
        </Text>
        <Text variant="body" color="muted">
          Muted - Secondary content color
        </Text>
        <Text variant="body" color="accent">
          Accent - Teal accent color for highlights
        </Text>
        <Text variant="body" color="success">
          Success - Positive feedback
        </Text>
        <Text variant="body" color="warning">
          Warning - Caution messages
        </Text>
        <Text variant="body" color="error">
          Error - Error states
        </Text>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <Text variant="body" color="inverse">
            Inverse - For dark backgrounds
          </Text>
        </div>
      </div>
    ),
  ],
}

export const CaptionAndOverline: Story = {
  decorators: [
    () => (
      <div className="space-y-6">
        <div>
          <Text variant="overline" color="accent">
            Featured Project
          </Text>
          <Text variant="h3" className="mt-2">
            Project Title
          </Text>
          <Text variant="body" color="muted" className="mt-2">
            Project description goes here with more details about the project.
          </Text>
          <Text variant="caption" color="muted" className="mt-3">
            Updated 3 days ago • React • TypeScript
          </Text>
        </div>
      </div>
    ),
  ],
}

export const CodeVariant: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <Text variant="body">
          Use the <Text as="span" variant="code" className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">npm install</Text> command to get started.
        </Text>
        <Text variant="code" className="block bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
          {`const greeting = "Hello, World!";
console.log(greeting);`}
        </Text>
      </div>
    ),
  ],
}

export const Truncation: Story = {
  decorators: [
    () => (
      <div className="space-y-6 max-w-md">
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            Single line truncate
          </Text>
          <Text variant="body" truncate>
            This is a very long text that will be truncated to a single line
            with an ellipsis at the end.
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            2-line clamp
          </Text>
          <Text variant="body" clamp={2}>
            This text will be clamped to two lines. Any content beyond the
            second line will be hidden with an ellipsis. This is useful for card
            descriptions where you want consistent heights.
          </Text>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            3-line clamp
          </Text>
          <Text variant="bodySmall" clamp={3}>
            This text will be clamped to three lines. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris.
          </Text>
        </div>
      </div>
    ),
  ],
}

export const SemanticElements: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <Text variant="caption" color="muted">
          Text uses semantic HTML elements by default:
        </Text>
        <Text variant="h1">H1 renders as {'<h1>'}</Text>
        <Text variant="h2">H2 renders as {'<h2>'}</Text>
        <Text variant="body">Body renders as {'<p>'}</Text>
        <Text variant="caption">Caption renders as {'<span>'}</Text>
        <Text variant="code">Code renders as {'<code>'}</Text>
        <Text variant="body" as="span" className="block">
          Override with as="span" to render as {'<span>'}
        </Text>
      </div>
    ),
  ],
}

export const RealWorldExample: Story = {
  decorators: [
    () => (
      <article className="max-w-2xl space-y-6">
        <header>
          <Text variant="overline" color="accent">
            Blog Post
          </Text>
          <Text variant="h1" className="mt-2">
            Building a Design System with React
          </Text>
          <Text variant="caption" color="muted" className="mt-4">
            January 14, 2026 • 8 min read
          </Text>
        </header>
        <Text variant="bodyLarge" color="muted">
          A comprehensive guide to building scalable design systems using React,
          TypeScript, and modern CSS.
        </Text>
        <Text variant="body">
          Design systems help maintain consistency across large applications.
          This article explores how to create reusable components with
          well-defined typography, spacing, and color tokens.
        </Text>
        <Text variant="h2" className="mt-8">
          Getting Started
        </Text>
        <Text variant="body">
          First, define your typography scale. The most important decision is
          your base font size. We recommend 18px for body text to ensure
          readability across devices.
        </Text>
      </article>
    ),
  ],
}
