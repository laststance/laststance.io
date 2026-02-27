import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Box } from './Box'
import { VStack } from './Stack'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Design System/Primitives/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `
The Text component is the foundation for all typography in the design system.

## Typography Scale (Responsive 3-Step)

| Variant | Mobile | Tablet (sm:) | Desktop (lg:) | Use Case |
|---------|--------|-------------|---------------|----------|
| display | 36px | 48px | 60px | Hero sections |
| h1 | 30px | 36px | 48px | Page titles |
| h2 | 24px | 30px | 36px | Section titles |
| h3 | 20px | 24px | 28px | Subsection titles |
| h4 | 18px | 20px | 24px | Card titles |
| bodyLarge | 18px | 20px | 22px | Emphasized content |
| **body** | **16px** | **18px** | **20px** | **Default text** |
| bodySmall | 14px | 16px | 18px | Secondary content |
| caption | 14px | 14px | 16px | Labels, meta info |
| overline | 12px | 12px | 14px | Category labels |
| code | 14px | 16px | 18px | Code snippets |

## Spacing Props (MUI-style)

Text supports spacing props via the shared 8pt grid: \`mt\`, \`mb\`, \`mx\`, \`my\`, \`m\`, \`p\`, \`px\`, \`py\`.

## Accessibility

All color variants meet WCAG 2.2 AA contrast requirements. Dark muted uses zinc-300 (10:1 ratio).
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
      description: 'Typography variant (responsive 3-step)',
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
      description: 'Text color (WCAG AA compliant)',
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    transform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'none'],
      description: 'Text transform',
    },
    italic: {
      control: 'boolean',
      description: 'Enable italic style',
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
    children:
      'Body text — responsive 16px (mobile) → 18px (tablet) → 20px (desktop).',
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
      <VStack gap={6}>
        <Text variant="display">Display — 36px → 48px → 60px</Text>
        <Text variant="h1">Heading 1 — 30px → 36px → 48px</Text>
        <Text variant="h2">Heading 2 — 24px → 30px → 36px</Text>
        <Text variant="h3">Heading 3 — 20px → 24px → 28px</Text>
        <Text variant="h4">Heading 4 — 18px → 20px → 24px</Text>
      </VStack>
    ),
  ],
}

export const BodyVariants: Story = {
  decorators: [
    () => (
      <VStack gap={6}>
        <Box>
          <Text variant="caption" color="muted" className="mb-1">
            Body Large (18px → 20px → 22px)
          </Text>
          <Text variant="bodyLarge">
            This is body large text, used for lead paragraphs and emphasized
            content that needs to stand out from the regular body text.
          </Text>
        </Box>
        <Box>
          <Text variant="caption" color="muted" className="mb-1">
            Body (16px → 18px → 20px) — Default
          </Text>
          <Text variant="body">
            This is the default body text. Responsive sizing ensures readability
            across devices — 16px on mobile for 40+ chars/line, scaling up to
            20px on desktop for Apple.com-style readability.
          </Text>
        </Box>
        <Box>
          <Text variant="caption" color="muted" className="mb-1">
            Body Small (14px → 16px → 18px)
          </Text>
          <Text variant="bodySmall">
            This is body small text. Use for secondary content or areas where
            space is limited.
          </Text>
        </Box>
      </VStack>
    ),
  ],
}

export const ColorVariants: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="body" color="default">
          Default — zinc-900/zinc-50 (primary content)
        </Text>
        <Text variant="body" color="muted">
          Muted — zinc-600/zinc-300 (secondary content)
        </Text>
        <Text variant="body" color="accent">
          Accent — teal-700/teal-400 (links, highlights)
        </Text>
        <Text variant="body" color="success">
          Success — Positive feedback
        </Text>
        <Text variant="body" color="warning">
          Warning — Caution messages
        </Text>
        <Text variant="body" color="error">
          Error — Error states
        </Text>
        <Box className="rounded-lg bg-zinc-900 p-4">
          <Text variant="body" color="inverse">
            Inverse — For dark backgrounds
          </Text>
        </Box>
      </VStack>
    ),
  ],
}

export const TransformAndStyle: Story = {
  name: 'Transform & Style',
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="body" transform="uppercase">
          Uppercase text transform
        </Text>
        <Text variant="body" transform="capitalize">
          capitalize each word in the sentence
        </Text>
        <Text variant="body" italic>
          Italic style for emphasis
        </Text>
        <Text variant="body" weight="bold">
          Bold weight override
        </Text>
        <Text variant="body" italic weight="semibold" color="accent">
          Combined: italic + semibold + accent
        </Text>
      </VStack>
    ),
  ],
}

export const SpacingProps: Story = {
  name: 'Spacing Props (MUI-style)',
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="caption" color="muted">
          Text supports MUI-style spacing props from the 8pt grid:
        </Text>
        <Box border="muted" rounded="lg" p={4}>
          <Text variant="h3">Title</Text>
          <Text variant="body" color="muted" mt={4}>
            mt=4 (16px top margin)
          </Text>
          <Text variant="bodySmall" color="muted" mt={2}>
            mt=2 (8px top margin)
          </Text>
        </Box>
        <Box border="muted" rounded="lg" p={4}>
          <Text variant="body" mb={6}>
            mb=6 (24px bottom margin)
          </Text>
          <Text variant="body" color="muted">
            Next element
          </Text>
        </Box>
        <Box border="muted" rounded="lg">
          <Text variant="body" p={6}>
            p=6 (24px all-around padding)
          </Text>
        </Box>
      </VStack>
    ),
  ],
}

export const CaptionAndOverline: Story = {
  decorators: [
    () => (
      <VStack gap={6}>
        <Box>
          <Text variant="overline" color="accent">
            Featured Project
          </Text>
          <Text variant="h3" className="mt-2">
            Project Title
          </Text>
          <Text variant="body" color="muted" mt={2}>
            Project description goes here with more details about the project.
          </Text>
          <Text variant="caption" color="muted" mt={3}>
            Updated 3 days ago — React — TypeScript
          </Text>
        </Box>
      </VStack>
    ),
  ],
}

export const CodeVariant: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="body">
          Use the{' '}
          <Text
            as="span"
            variant="code"
            className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800"
          >
            npm install
          </Text>{' '}
          command to get started.
        </Text>
        <Text
          variant="code"
          className="block rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800"
        >
          {`const greeting = "Hello, World!";
console.log(greeting);`}
        </Text>
      </VStack>
    ),
  ],
}

export const Truncation: Story = {
  decorators: [
    () => (
      <VStack gap={6} className="max-w-md">
        <Box>
          <Text variant="caption" color="muted" className="mb-2">
            Single line truncate
          </Text>
          <Text variant="body" truncate>
            This is a very long text that will be truncated to a single line
            with an ellipsis at the end.
          </Text>
        </Box>
        <Box>
          <Text variant="caption" color="muted" className="mb-2">
            2-line clamp
          </Text>
          <Text variant="body" clamp={2}>
            This text will be clamped to two lines. Any content beyond the
            second line will be hidden with an ellipsis. This is useful for card
            descriptions where you want consistent heights.
          </Text>
        </Box>
        <Box>
          <Text variant="caption" color="muted" className="mb-2">
            3-line clamp
          </Text>
          <Text variant="bodySmall" clamp={3}>
            This text will be clamped to three lines. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris.
          </Text>
        </Box>
      </VStack>
    ),
  ],
}

export const SemanticElements: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="caption" color="muted">
          Text uses semantic HTML elements by default:
        </Text>
        <Text variant="h1">H1 renders as {'<h1>'}</Text>
        <Text variant="h2">H2 renders as {'<h2>'}</Text>
        <Text variant="body">Body renders as {'<p>'}</Text>
        <Text variant="caption">Caption renders as {'<span>'}</Text>
        <Text variant="code">Code renders as {'<code>'}</Text>
        <Text variant="body" as="span" className="block">
          Override with as=&quot;span&quot; to render as {'<span>'}
        </Text>
      </VStack>
    ),
  ],
}

export const PolymorphicAs: Story = {
  name: 'Polymorphic (as prop)',
  decorators: [
    () => (
      <VStack gap={4}>
        <Text variant="caption" color="muted">
          The &quot;as&quot; prop enables type-safe polymorphism:
        </Text>
        <Text as="a" variant="body" color="accent" href="#example">
          as=&quot;a&quot; — renders as anchor with valid href
        </Text>
        <Text as="span" variant="body">
          as=&quot;span&quot; — renders as inline span
        </Text>
        <Text as="label" variant="caption" htmlFor="example-input">
          as=&quot;label&quot; — renders as label with htmlFor
        </Text>
      </VStack>
    ),
  ],
}

export const RealWorldExample: Story = {
  decorators: [
    () => (
      <article className="max-w-2xl">
        <header>
          <Text variant="overline" color="accent">
            Blog Post
          </Text>
          <Text variant="h1" mt={2}>
            Building a Design System with React
          </Text>
          <Text variant="caption" color="muted" mt={4}>
            January 14, 2026 — 8 min read
          </Text>
        </header>
        <Text variant="bodyLarge" color="muted" mt={6}>
          A comprehensive guide to building scalable design systems using React,
          TypeScript, and modern CSS.
        </Text>
        <Text variant="body" mt={4}>
          Design systems help maintain consistency across large applications.
          This article explores how to create reusable components with
          well-defined typography, spacing, and color tokens.
        </Text>
        <Text variant="h2" mt={8}>
          Getting Started
        </Text>
        <Text variant="body" mt={4}>
          First, define your typography scale. We use a responsive 3-step
          approach: 16px on mobile, 18px on tablet, and 20px on desktop for
          optimal readability across all devices.
        </Text>
      </article>
    ),
  ],
}
