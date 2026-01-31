import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Box } from './Box'
import { HStack, Stack, VStack } from './Stack'
import { Text } from './Text'

const meta: Meta<typeof Stack> = {
  title: 'Design System/Primitives/Stack',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: `
Stack is a layout component for arranging items with consistent spacing.

## Spacing Scale (8pt Grid)

| Gap | Pixels | Use Case |
|-----|--------|----------|
| 1 | 4px | Micro spacing |
| 2 | 8px | Tight spacing (icon + text) |
| 3 | 12px | Small spacing |
| 4 | 16px | Standard spacing |
| 6 | 24px | Section spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | Major sections |
| 16 | 64px | Page sections |

## Variants

- **Stack** - Base component with configurable direction
- **VStack** - Shorthand for vertical (column) stack
- **HStack** - Shorthand for horizontal (row) stack
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Stack direction',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis justification',
    },
    wrap: {
      control: 'boolean',
      description: 'Enable flex wrap',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Stack>

// Demo item component
const DemoItem = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg bg-teal-100 px-4 py-2 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
    {children}
  </div>
)

export const Default: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
      </>
    ),
  },
}

export const VerticalStack: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
      </VStack>
    ),
  ],
}

export const HorizontalStack: Story = {
  decorators: [
    () => (
      <HStack gap={4}>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
      </HStack>
    ),
  ],
}

export const SpacingScale: Story = {
  decorators: [
    () => (
      <VStack gap={8}>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            gap=2 (8px)
          </Text>
          <HStack gap={2}>
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            gap=4 (16px)
          </Text>
          <HStack gap={4}>
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            gap=6 (24px)
          </Text>
          <HStack gap={6}>
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            gap=8 (32px)
          </Text>
          <HStack gap={8}>
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
      </VStack>
    ),
  ],
}

export const Alignment: Story = {
  decorators: [
    () => (
      <VStack gap={8}>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            align="start"
          </Text>
          <HStack gap={4} align="start" className="h-24 bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>Short</DemoItem>
            <DemoItem>Medium text</DemoItem>
            <DemoItem>Much longer text here</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            align="center"
          </Text>
          <HStack gap={4} align="center" className="h-24 bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>Short</DemoItem>
            <DemoItem>Medium text</DemoItem>
            <DemoItem>Much longer text here</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            align="end"
          </Text>
          <HStack gap={4} align="end" className="h-24 bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>Short</DemoItem>
            <DemoItem>Medium text</DemoItem>
            <DemoItem>Much longer text here</DemoItem>
          </HStack>
        </div>
      </VStack>
    ),
  ],
}

export const Justification: Story = {
  decorators: [
    () => (
      <VStack gap={6}>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            justify="start"
          </Text>
          <HStack gap={4} justify="start" fullWidth className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            justify="center"
          </Text>
          <HStack gap={4} justify="center" fullWidth className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            justify="between"
          </Text>
          <HStack gap={4} justify="between" fullWidth className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
        <div>
          <Text variant="caption" color="muted" className="mb-2">
            justify="evenly"
          </Text>
          <HStack gap={4} justify="evenly" fullWidth className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
            <DemoItem>A</DemoItem>
            <DemoItem>B</DemoItem>
            <DemoItem>C</DemoItem>
          </HStack>
        </div>
      </VStack>
    ),
  ],
}

export const WithWrap: Story = {
  decorators: [
    () => (
      <div className="max-w-md">
        <Text variant="caption" color="muted" className="mb-2">
          wrap=true (resize window to see)
        </Text>
        <HStack gap={4} wrap>
          <DemoItem>Item 1</DemoItem>
          <DemoItem>Item 2</DemoItem>
          <DemoItem>Item 3</DemoItem>
          <DemoItem>Item 4</DemoItem>
          <DemoItem>Item 5</DemoItem>
          <DemoItem>Item 6</DemoItem>
        </HStack>
      </div>
    ),
  ],
}

export const NestedStacks: Story = {
  decorators: [
    () => (
      <VStack gap={6}>
        <HStack gap={4} align="center" justify="between" fullWidth>
          <Text variant="h3">Page Title</Text>
          <HStack gap={2}>
            <DemoItem>Action 1</DemoItem>
            <DemoItem>Action 2</DemoItem>
          </HStack>
        </HStack>
        <VStack gap={4}>
          <Text variant="body">
            This example shows nested Stack components for complex layouts.
          </Text>
          <HStack gap={4}>
            <Box p={4} rounded="lg" bg="secondary" className="flex-1">
              <VStack gap={2}>
                <Text variant="h4">Card 1</Text>
                <Text variant="bodySmall" color="muted">
                  Description text
                </Text>
              </VStack>
            </Box>
            <Box p={4} rounded="lg" bg="secondary" className="flex-1">
              <VStack gap={2}>
                <Text variant="h4">Card 2</Text>
                <Text variant="bodySmall" color="muted">
                  Description text
                </Text>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    ),
  ],
}

export const RealWorldExample: Story = {
  decorators: [
    () => (
      <Box maxW="md" p={6} rounded="xl" bg="elevated" shadow="lg" border="default">
        <VStack gap={4}>
          <HStack gap={4} align="center">
            <div className="h-12 w-12 rounded-full bg-teal-500" />
            <VStack gap={0}>
              <Text variant="h4">John Doe</Text>
              <Text variant="caption" color="muted">
                Software Engineer
              </Text>
            </VStack>
          </HStack>
          <Text variant="body" color="muted">
            Full-stack developer with 5+ years of experience building web
            applications with React and Node.js.
          </Text>
          <HStack gap={2} wrap>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
              React
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
              TypeScript
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
              Node.js
            </span>
          </HStack>
        </VStack>
      </Box>
    ),
  ],
}
