import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Box } from './Box'
import { HStack, VStack } from './Stack'
import { Text } from './Text'

const meta: Meta<typeof Box> = {
  title: 'Design System/Primitives/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component: `
Box is a fundamental layout primitive for consistent spacing and styling.

## Padding Scale (8pt Grid)

| Value | Pixels | Use Case |
|-------|--------|----------|
| 1 | 4px | Micro |
| 2 | 8px | Tight |
| 3 | 12px | Small |
| 4 | 16px | Default |
| 6 | 24px | Comfortable |
| 8 | 32px | Relaxed |
| 12 | 48px | Spacious |
| 16 | 64px | Extra spacious |

## Border Radius Scale

| Value | Pixels | Use Case |
|-------|--------|----------|
| sm | 4px | Subtle rounding |
| md | 8px | Default (matches --radius) |
| lg | 12px | Cards |
| xl | 16px | Large cards |
| 2xl | 20px | Feature cards |
| full | 9999px | Pills, avatars |
        `,
      },
    },
  },
  argTypes: {
    p: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Padding (all sides)',
    },
    px: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Horizontal padding',
    },
    py: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Vertical padding',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Border radius',
    },
    bg: {
      control: 'select',
      options: ['transparent', 'primary', 'secondary', 'elevated', 'accent'],
      description: 'Background color',
    },
    border: {
      control: 'select',
      options: ['none', 'default', 'muted'],
      description: 'Border style',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow',
    },
    maxW: {
      control: 'select',
      options: [
        'none',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        'full',
        'prose',
      ],
      description: 'Max width',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Box>

export const Default: Story = {
  args: {
    p: 6,
    rounded: 'xl',
    bg: 'elevated',
    border: 'default',
    children: (
      <Text variant="body">Box with default styling</Text>
    ),
  },
}

export const PaddingScale: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        {([2, 4, 6, 8, 12] as const).map((p) => (
          <Box key={p} p={p} bg="secondary" rounded="lg">
            <Text variant="caption">p={p} ({p * 4}px)</Text>
          </Box>
        ))}
      </VStack>
    ),
  ],
}

export const BorderRadiusScale: Story = {
  decorators: [
    () => (
      <HStack gap={4} wrap>
        {(['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map(
          (radius) => (
            <Box
              key={radius}
              p={4}
              rounded={radius}
              bg="secondary"
              className="h-20 w-20 flex items-center justify-center"
            >
              <Text variant="caption">{radius}</Text>
            </Box>
          )
        )}
      </HStack>
    ),
  ],
}

export const BackgroundVariants: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <Box p={4} rounded="lg" bg="primary" border="default">
          <Text variant="body">bg="primary" - Main background</Text>
        </Box>
        <Box p={4} rounded="lg" bg="secondary">
          <Text variant="body">bg="secondary" - Muted background</Text>
        </Box>
        <Box p={4} rounded="lg" bg="elevated" shadow="md">
          <Text variant="body">bg="elevated" - Card background</Text>
        </Box>
        <Box p={4} rounded="lg" bg="accent">
          <Text variant="body">bg="accent" - Accent background</Text>
        </Box>
      </VStack>
    ),
  ],
}

export const ShadowScale: Story = {
  decorators: [
    () => (
      <HStack gap={6} wrap className="p-8">
        {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
          <Box
            key={shadow}
            p={6}
            rounded="xl"
            bg="elevated"
            shadow={shadow}
            className="w-32"
          >
            <Text variant="caption" align="center">
              {shadow}
            </Text>
          </Box>
        ))}
      </HStack>
    ),
  ],
}

export const BorderVariants: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        <Box p={4} rounded="lg" bg="elevated" border="none">
          <Text variant="body">border="none"</Text>
        </Box>
        <Box p={4} rounded="lg" bg="elevated" border="default">
          <Text variant="body">border="default"</Text>
        </Box>
        <Box p={4} rounded="lg" bg="elevated" border="muted">
          <Text variant="body">border="muted" (50% opacity)</Text>
        </Box>
      </VStack>
    ),
  ],
}

export const MaxWidthConstraints: Story = {
  decorators: [
    () => (
      <VStack gap={4}>
        {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
          <Box key={size} maxW={size} p={4} bg="secondary" rounded="lg" w="full">
            <Text variant="caption">maxW="{size}"</Text>
          </Box>
        ))}
      </VStack>
    ),
  ],
}

export const MarginVariants: Story = {
  decorators: [
    () => (
      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
        <Box mt={4} p={4} bg="elevated" rounded="lg">
          <Text variant="caption">mt=4 (16px top margin)</Text>
        </Box>
        <Box my={6} p={4} bg="elevated" rounded="lg">
          <Text variant="caption">my=6 (24px vertical margin)</Text>
        </Box>
        <Box mx="auto" maxW="xs" p={4} bg="elevated" rounded="lg">
          <Text variant="caption">mx="auto" (centered)</Text>
        </Box>
      </div>
    ),
  ],
}

export const CardExample: Story = {
  decorators: [
    () => (
      <Box
        maxW="sm"
        p={6}
        rounded="2xl"
        bg="elevated"
        shadow="lg"
        border="muted"
      >
        <VStack gap={4}>
          <div className="h-40 w-full rounded-xl bg-gradient-to-br from-teal-400 to-teal-600" />
          <VStack gap={2}>
            <Text variant="overline" color="accent">
              Featured
            </Text>
            <Text variant="h3">Project Title</Text>
            <Text variant="body" color="muted">
              A brief description of the project that explains what it does and
              why it's useful.
            </Text>
          </VStack>
          <HStack gap={2}>
            <Box px={3} py={1} rounded="full" bg="secondary">
              <Text variant="caption">React</Text>
            </Box>
            <Box px={3} py={1} rounded="full" bg="secondary">
              <Text variant="caption">TypeScript</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    ),
  ],
}

export const AsideExample: Story = {
  decorators: [
    () => (
      <Box as="aside" maxW="xs" p={4} rounded="lg" bg="secondary" border="muted">
        <VStack gap={3}>
          <Text variant="h4">Pro Tip</Text>
          <Text variant="bodySmall" color="muted">
            Use the Box component to create consistent padding and styling
            across your application.
          </Text>
        </VStack>
      </Box>
    ),
  ],
}

export const LayoutExample: Story = {
  decorators: [
    () => (
      <VStack gap={8}>
        {/* Header */}
        <Box w="full" py={4} px={6} bg="elevated" border="muted">
          <HStack justify="between" align="center">
            <Text variant="h4">Logo</Text>
            <HStack gap={6}>
              <Text variant="body">Home</Text>
              <Text variant="body">About</Text>
              <Text variant="body">Projects</Text>
            </HStack>
          </HStack>
        </Box>

        {/* Content */}
        <Box maxW="2xl" mx="auto" px={4}>
          <VStack gap={6}>
            <Text variant="h1">Page Title</Text>
            <Text variant="bodyLarge" color="muted">
              This example demonstrates using Box for page layout with
              consistent spacing and max-width constraints.
            </Text>
            <Box p={6} rounded="xl" bg="secondary">
              <Text variant="body">
                Content section with elevated background and padding.
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Footer */}
        <Box w="full" py={8} px={6} bg="secondary" mt={8}>
          <Box maxW="2xl" mx="auto">
            <Text variant="bodySmall" color="muted" align="center">
              © 2026 Laststance.io. All rights reserved.
            </Text>
          </Box>
        </Box>
      </VStack>
    ),
  ],
}
