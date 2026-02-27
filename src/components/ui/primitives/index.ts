/**
 * Design System Primitives
 *
 * Core UI components that form the foundation of the design system.
 * These components enforce consistent typography, spacing, and layout.
 *
 * @example
 * import { Text, Stack, Box, HStack, VStack } from '@/components/ui/primitives'
 *
 * function MyComponent() {
 *   return (
 *     <Box p={6} rounded="xl" bg="elevated">
 *       <Stack gap={4}>
 *         <Text variant="h2">Title</Text>
 *         <Text variant="body" color="muted">Description</Text>
 *       </Stack>
 *     </Box>
 *   )
 * }
 */

export { Text, textVariants, type TextVariantProps } from './Text'
export {
  Stack,
  VStack,
  HStack,
  stackVariants,
  type StackVariantProps,
} from './Stack'
export { Box, boxVariants, type BoxVariantProps } from './Box'
export { spacingVariants, type SpacingVariants } from './spacing'
