import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from '@/lib/design-tokens'

import { Box } from './Box'
import { HStack, VStack } from './Stack'
import { Text } from './Text'

/**
 * Design Tokens Documentation
 *
 * This story documents all design tokens used in the design system.
 */
const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    docs: {
      description: {
        component: `
# Design Tokens

Design tokens are the visual design atoms of the design system. They are named entities that store visual design attributes. We use them in place of hard-coded values to ensure flexibility and consistency.

## Token Source of Truth

\`\`\`
src/lib/design-tokens.ts  ← SINGLE SOURCE OF TRUTH
       │
       ├──→ tailwind.config.ts  (imports typography, generates fontSize)
       ├──→ Text.tsx CVA variants (maps to Tailwind classes)
       └──→ DesignTokens.stories.tsx (imports and visualizes tokens)
\`\`\`

## Usage

\`\`\`tsx
// Preferred: Use component primitives
import { Text, Box, Stack } from '@/components/ui/primitives'

<Text variant="body">Uses responsive 16px→18px→20px</Text>
<Box p={4}>Uses spacing[4] for padding</Box>

// Escape hatch: Use tokens directly
import { typography, spacing } from '@/lib/design-tokens'
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const TypographyTokens: Story = {
  name: 'Typography (Responsive 3-Step)',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Typography Scale
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Responsive 3-step progression: mobile (default) → tablet (sm: 640px+)
          → desktop (lg: 1024px+). Desktop body text is 20px for Apple.com-style
          readability.
        </Text>
      </Box>

      <Box as="table" className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="py-3 text-left">
              <Text variant="caption">Token</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Mobile</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Tablet</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Desktop</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Line Height</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Example</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {(
            Object.entries(typography) as [string, typeof typography.body][]
          ).map(([name, token]) => (
            <tr
              key={name}
              className="border-b border-zinc-100 dark:border-zinc-800"
            >
              <td className="py-4">
                <Text
                  variant="code"
                  className="rounded bg-zinc-100 px-2 py-0.5 text-sm dark:bg-zinc-800"
                >
                  {name}
                </Text>
              </td>
              <td className="py-4">
                <Text variant="bodySmall">{token.mobile}</Text>
              </td>
              <td className="py-4">
                <Text variant="bodySmall">{token.tablet}</Text>
              </td>
              <td className="py-4">
                <Text variant="bodySmall" weight="semibold">
                  {token.fontSize}
                </Text>
              </td>
              <td className="py-4">
                <Text variant="bodySmall">{token.lineHeight}</Text>
              </td>
              <td className="py-4">
                <span
                  style={{
                    fontSize: token.fontSize,
                    lineHeight: token.lineHeight,
                    fontWeight: token.fontWeight,
                  }}
                >
                  Sample
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </VStack>
  ),
}

export const SpacingTokens: Story = {
  name: 'Spacing (8pt Grid)',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Spacing Scale
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Based on an 8pt grid system with 4pt for micro adjustments.
        </Text>
      </Box>

      <VStack gap={4}>
        {(Object.entries(spacing) as [string, string][]).map(([key, value]) => (
          <HStack key={key} gap={4} align="center">
            <Box className="w-16">
              <Text
                variant="code"
                className="rounded bg-zinc-100 px-2 py-0.5 text-sm dark:bg-zinc-800"
              >
                {key}
              </Text>
            </Box>
            <Box className="w-24">
              <Text variant="bodySmall" color="muted">
                {value}
              </Text>
            </Box>
            <div
              className="h-4 rounded bg-teal-500"
              style={{ width: value }}
            />
          </HStack>
        ))}
      </VStack>
    </VStack>
  ),
}

export const ColorTokens: Story = {
  name: 'Colors',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Color Tokens
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Semantic color tokens that adapt to light and dark themes.
        </Text>
      </Box>

      {/* Text Colors */}
      <Box>
        <Text variant="h3" className="mb-4">
          Text Colors
        </Text>
        <VStack gap={3}>
          {(Object.entries(colors.text) as [string, string][]).map(
            ([name, value]) => (
              <HStack key={name} gap={4} align="center">
                <Box className="w-32">
                  <Text
                    variant="code"
                    className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
                  >
                    text.{name}
                  </Text>
                </Box>
                <Box
                  p={2}
                  rounded="md"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <span style={{ color: value }}>Sample text</span>
                </Box>
              </HStack>
            )
          )}
        </VStack>
      </Box>

      {/* Background Colors */}
      <Box>
        <Text variant="h3" className="mb-4">
          Background Colors
        </Text>
        <HStack gap={4} wrap>
          {(Object.entries(colors.background) as [string, string][]).map(
            ([name, value]) => (
              <VStack key={name} gap={2} align="center">
                <Box
                  className="h-16 w-24 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  style={{ backgroundColor: value }}
                />
                <Text variant="caption">{name}</Text>
              </VStack>
            )
          )}
        </HStack>
      </Box>

      {/* Semantic Colors */}
      <Box>
        <Text variant="h3" className="mb-4">
          Semantic Colors
        </Text>
        <HStack gap={4} wrap>
          {(Object.entries(colors.semantic) as [string, string][]).map(
            ([name, value]) => (
              <VStack key={name} gap={2} align="center">
                <Box
                  className="h-16 w-24 rounded-lg"
                  style={{ backgroundColor: value }}
                />
                <Text variant="caption">{name}</Text>
              </VStack>
            )
          )}
        </HStack>
      </Box>
    </VStack>
  ),
}

export const RadiiTokens: Story = {
  name: 'Border Radius',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Border Radius
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Consistent border radius scale for UI elements.
        </Text>
      </Box>

      <HStack gap={6} wrap>
        {(Object.entries(radii) as [string, string][]).map(([name, value]) => (
          <VStack key={name} gap={2} align="center">
            <Box
              className="h-20 w-20 bg-teal-500"
              style={{ borderRadius: value }}
            />
            <Text variant="caption">{name}</Text>
            <Text variant="caption" color="muted">
              {value}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  ),
}

export const ShadowTokens: Story = {
  name: 'Shadows',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Shadow Scale
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Elevation shadows for creating depth hierarchy.
        </Text>
      </Box>

      <HStack gap={8} wrap className="p-8">
        {(Object.entries(shadows) as [string, string][]).map(
          ([name, value]) => (
            <VStack key={name} gap={3} align="center">
              <Box
                className="h-24 w-24 rounded-xl bg-white dark:bg-zinc-800"
                style={{ boxShadow: value }}
              />
              <Text variant="caption">{name}</Text>
            </VStack>
          )
        )}
      </HStack>
    </VStack>
  ),
}

export const ContrastCheck: Story = {
  name: 'Contrast & Accessibility',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Contrast & Accessibility
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          All text colors meet WCAG 2.2 AA contrast requirements (4.5:1 for
          normal text, 3:1 for large text).
        </Text>
      </Box>

      <HStack gap={6} wrap>
        {/* Light Mode */}
        <Box p={6} rounded="xl" className="border border-zinc-200 bg-white">
          <VStack gap={4}>
            <Text variant="h4">Light Mode</Text>
            <Text variant="body" color="default">
              Default — zinc-900 (primary content)
            </Text>
            <Text variant="body" color="muted">
              Muted — zinc-600 (secondary content)
            </Text>
            <Text variant="body" color="accent">
              Accent — teal-700 (links, highlights)
            </Text>
            <Text variant="bodySmall" color="muted">
              Body Small — zinc-600 (fine print)
            </Text>
          </VStack>
        </Box>

        {/* Dark Mode */}
        <Box
          p={6}
          rounded="xl"
          className="border border-zinc-700 bg-zinc-900"
        >
          <VStack gap={4}>
            <Text variant="h4" className="text-zinc-50">
              Dark Mode
            </Text>
            <Text variant="body" className="text-zinc-50">
              Default — zinc-50 (primary content)
            </Text>
            <Text variant="body" className="text-zinc-300">
              Muted — zinc-300 (secondary, 10:1 ratio)
            </Text>
            <Text variant="body" className="text-teal-400">
              Accent — teal-400 (links, highlights)
            </Text>
            <Text variant="bodySmall" className="text-zinc-300">
              Body Small — zinc-300 (fine print)
            </Text>
          </VStack>
        </Box>
      </HStack>

      <Box p={4} rounded="lg" bg="secondary" border="muted">
        <Text variant="bodySmall">
          <strong>Note:</strong> Body text is responsive: 16px mobile → 18px
          tablet → 20px desktop. Dark muted text uses zinc-300 (improved from
          zinc-400) for 10:1 contrast ratio. Accent uses teal-700 light / teal-400
          dark for AA compliance.
        </Text>
      </Box>
    </VStack>
  ),
}

export const MigrationPatterns: Story = {
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Migration Patterns
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Before/after examples for migrating from raw HTML to design system
          primitives.
        </Text>
      </Box>

      <VStack gap={6}>
        {/* Pattern 1: Page Title */}
        <Box p={4} rounded="lg" border="default">
          <Text variant="h4" className="mb-3">
            Page Title
          </Text>
          <HStack gap={4} wrap>
            <Box className="flex-1">
              <Text variant="overline" color="error" className="mb-2">
                Before
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-red-50 font-mono text-sm dark:bg-red-950"
              >
                {`<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">`}
              </Box>
            </Box>
            <Box className="flex-1">
              <Text variant="overline" color="success" className="mb-2">
                After
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-green-50 font-mono text-sm dark:bg-green-950"
              >
                {`<Text variant="h1">`}
              </Box>
            </Box>
          </HStack>
        </Box>

        {/* Pattern 2: Muted Description */}
        <Box p={4} rounded="lg" border="default">
          <Text variant="h4" className="mb-3">
            Muted Description
          </Text>
          <HStack gap={4} wrap>
            <Box className="flex-1">
              <Text variant="overline" color="error" className="mb-2">
                Before
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-red-50 font-mono text-sm dark:bg-red-950"
              >
                {`<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">`}
              </Box>
            </Box>
            <Box className="flex-1">
              <Text variant="overline" color="success" className="mb-2">
                After
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-green-50 font-mono text-sm dark:bg-green-950"
              >
                {`<Text variant="body" color="muted" mt={6}>`}
              </Box>
            </Box>
          </HStack>
        </Box>

        {/* Pattern 3: Layout Container */}
        <Box p={4} rounded="lg" border="default">
          <Text variant="h4" className="mb-3">
            Layout Container
          </Text>
          <HStack gap={4} wrap>
            <Box className="flex-1">
              <Text variant="overline" color="error" className="mb-2">
                Before
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-red-50 font-mono text-sm dark:bg-red-950"
              >
                {`<div className="mt-16 sm:mt-20">`}
              </Box>
            </Box>
            <Box className="flex-1">
              <Text variant="overline" color="success" className="mb-2">
                After
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-green-50 font-mono text-sm dark:bg-green-950"
              >
                {`<Box mt={16}>`}
              </Box>
            </Box>
          </HStack>
        </Box>

        {/* Pattern 4: Flex Layout */}
        <Box p={4} rounded="lg" border="default">
          <Text variant="h4" className="mb-3">
            Flex Layout
          </Text>
          <HStack gap={4} wrap>
            <Box className="flex-1">
              <Text variant="overline" color="error" className="mb-2">
                Before
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-red-50 font-mono text-sm dark:bg-red-950"
              >
                {`<div className="flex flex-wrap gap-6 items-center">`}
              </Box>
            </Box>
            <Box className="flex-1">
              <Text variant="overline" color="success" className="mb-2">
                After
              </Text>
              <Box
                p={3}
                rounded="md"
                className="bg-green-50 font-mono text-sm dark:bg-green-950"
              >
                {`<HStack gap={6} wrap align="center">`}
              </Box>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </VStack>
  ),
}

export const SpacingApplications: Story = {
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Spacing Applications
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Real layout patterns using the 8pt grid spacing system.
        </Text>
      </Box>

      {/* Section Layout */}
      <Box border="default" rounded="xl" p={6}>
        <Text variant="h4" className="mb-4">
          Section Layout
        </Text>
        <Box
          className="border-2 border-dashed border-teal-500/30"
          mt={16}
          p={6}
        >
          <Text variant="overline" color="accent">
            mt-16 (64px) — Section spacing
          </Text>
          <Text variant="h2" className="mt-4">
            Section Title
          </Text>
          <Text variant="body" color="muted" mt={6}>
            p-6 (24px) — Card padding
          </Text>
        </Box>
      </Box>

      {/* Card Layout */}
      <Box border="default" rounded="xl" p={6}>
        <Text variant="h4" className="mb-4">
          Card Pattern
        </Text>
        <Box
          p={6}
          rounded="xl"
          bg="elevated"
          shadow="md"
          border="muted"
          maxW="md"
        >
          <Text variant="overline" color="accent">
            Featured Project
          </Text>
          <Text variant="h3" mt={2}>
            Project Name
          </Text>
          <Text variant="body" color="muted" mt={2}>
            gap-4 between items, p-6 card padding
          </Text>
          <Text variant="caption" color="muted" mt={3}>
            Updated 3 days ago
          </Text>
        </Box>
      </Box>

      {/* List Layout */}
      <Box border="default" rounded="xl" p={6}>
        <Text variant="h4" className="mb-4">
          List Pattern
        </Text>
        <VStack gap={4}>
          {['Item One', 'Item Two', 'Item Three'].map((item) => (
            <Box key={item} p={4} rounded="lg" border="muted">
              <Text variant="body">{item}</Text>
              <Text variant="bodySmall" color="muted" mt={1}>
                gap-4 (16px) between items
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  ),
}
