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

## Token Categories

1. **Typography** - Font sizes, line heights, font weights
2. **Spacing** - Based on 8pt grid system
3. **Colors** - Semantic color tokens
4. **Radii** - Border radius values
5. **Shadows** - Elevation shadows

## Usage

\`\`\`tsx
import { typography, spacing, colors } from '@/lib/design-tokens'

// Use tokens directly
const style = {
  fontSize: typography.body.fontSize, // '1.125rem'
  marginBottom: spacing[4], // '1rem'
}

// Or use the component primitives
import { Text, Box, Stack } from '@/components/ui/primitives'

<Text variant="body">Uses typography.body tokens</Text>
<Box p={4}>Uses spacing[4] for padding</Box>
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
  name: 'Typography',
  render: () => (
    <VStack gap={8}>
      <Box>
        <Text variant="h2" className="mb-6">
          Typography Scale
        </Text>
        <Text variant="body" color="muted" className="mb-8">
          Font sizes have been increased for improved readability. Body text is
          now 18px (up from 16px).
        </Text>
      </Box>

      <Box as="table" className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="py-3 text-left">
              <Text variant="caption">Token</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Size</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Line Height</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Weight</Text>
            </th>
            <th className="py-3 text-left">
              <Text variant="caption">Example</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {(Object.entries(typography) as [string, typeof typography.body][]).map(
            ([name, token]) => (
              <tr
                key={name}
                className="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td className="py-4">
                  <Text variant="code" className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">
                    {name}
                  </Text>
                </td>
                <td className="py-4">
                  <Text variant="bodySmall">{token.fontSize}</Text>
                </td>
                <td className="py-4">
                  <Text variant="bodySmall">{token.lineHeight}</Text>
                </td>
                <td className="py-4">
                  <Text variant="bodySmall">{token.fontWeight}</Text>
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
            )
          )}
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
              <Text variant="code" className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">
                {key}
              </Text>
            </Box>
            <Box className="w-24">
              <Text variant="bodySmall" color="muted">
                {value}
              </Text>
            </Box>
            <div
              className="h-4 bg-teal-500 rounded"
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
                  <Text variant="code" className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
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
                className="h-24 w-24 bg-white dark:bg-zinc-800 rounded-xl"
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
        <Box p={6} rounded="xl" className="bg-white border border-zinc-200">
          <VStack gap={4}>
            <Text variant="h4" className="text-zinc-800">
              Light Mode
            </Text>
            <Text variant="body" className="text-zinc-800">
              Primary text (zinc-800)
            </Text>
            <Text variant="body" className="text-zinc-600">
              Secondary text (zinc-600)
            </Text>
            <Text variant="body" className="text-teal-600">
              Accent text (teal-600)
            </Text>
          </VStack>
        </Box>

        {/* Dark Mode */}
        <Box p={6} rounded="xl" className="bg-zinc-900 border border-zinc-700">
          <VStack gap={4}>
            <Text variant="h4" className="text-zinc-100">
              Dark Mode
            </Text>
            <Text variant="body" className="text-zinc-100">
              Primary text (zinc-100)
            </Text>
            <Text variant="body" className="text-zinc-400">
              Secondary text (zinc-400)
            </Text>
            <Text variant="body" className="text-teal-400">
              Accent text (teal-400)
            </Text>
          </VStack>
        </Box>
      </HStack>

      <Box p={4} rounded="lg" bg="secondary" border="muted">
        <Text variant="bodySmall">
          <strong>Note:</strong> Body text is set to 18px minimum on desktop and
          16px on mobile to ensure readability. The minimum contrast ratio is
          4.5:1 for all text.
        </Text>
      </Box>
    </VStack>
  ),
}
