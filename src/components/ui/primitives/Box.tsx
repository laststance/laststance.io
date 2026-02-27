import { type VariantProps, cva } from 'class-variance-authority'
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

import { spacingVariants } from './spacing'

/**
 * Box component style variants using CVA
 *
 * A fundamental layout primitive for consistent spacing.
 * Spacing variants imported from shared spacing.ts (single source of truth).
 */
const boxVariants = cva('', {
  variants: {
    // Shared spacing variants (from spacing.ts)
    ...spacingVariants,

    /** Border radius */
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm', // 4px
      md: 'rounded-md', // 8px
      lg: 'rounded-lg', // 12px
      xl: 'rounded-xl', // 16px
      '2xl': 'rounded-2xl', // 20px
      full: 'rounded-full',
    },

    /** Background style */
    bg: {
      transparent: 'bg-transparent',
      primary: 'bg-background',
      secondary: 'bg-muted',
      elevated: 'bg-card',
      accent: 'bg-accent',
    },

    /** Border style */
    border: {
      none: 'border-0',
      default: 'border border-border',
      muted: 'border border-border/50',
    },

    /** Shadow */
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },

    /** Display */
    display: {
      block: 'block',
      inline: 'inline',
      inlineBlock: 'inline-block',
      flex: 'flex',
      inlineFlex: 'inline-flex',
      grid: 'grid',
      hidden: 'hidden',
    },

    /** Width */
    w: {
      auto: 'w-auto',
      full: 'w-full',
      screen: 'w-screen',
      max: 'w-max',
      min: 'w-min',
      fit: 'w-fit',
    },

    /** Max width */
    maxW: {
      none: 'max-w-none',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full',
      prose: 'max-w-prose',
    },
  },
  defaultVariants: {},
})

type BoxVariantProps = VariantProps<typeof boxVariants>

/**
 * Own props for the Box component.
 */
type BoxOwnProps<T extends ElementType> = {
  as?: T
  className?: string
  children?: ReactNode
  // Polymorphic ref requires broad type for compatibility across element types
  ref?: React.Ref<any>
} & BoxVariantProps

/**
 * Full props — merges own props with element-specific native props.
 */
type BoxProps<T extends ElementType = 'div'> = BoxOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxOwnProps<T>>

/**
 * Box component for consistent spacing and layout.
 *
 * A fundamental primitive that provides:
 * - Consistent padding/margin based on 8pt grid (shared with Text)
 * - Background, border, and shadow options
 * - Width constraints
 * - Display options
 *
 * @param p/px/py - Padding props from shared spacing scale
 * @param m/mx/my/mt/mb - Margin props from shared spacing scale
 * @param rounded - Border radius
 * @param bg - Background color
 * @param border - Border style
 * @param shadow - Shadow elevation
 * @param display - Display type
 * @param w - Width
 * @param maxW - Max width
 * @param as - Override default div element
 *
 * @example
 * // Card with padding and rounded corners
 * <Box p={6} rounded="xl" bg="elevated" shadow="md">
 *   <Text variant="h3">Card Title</Text>
 * </Box>
 *
 * // Constrained content area
 * <Box maxW="2xl" mx="auto" px={4}>
 *   <ArticleContent />
 * </Box>
 */
export function Box<T extends ElementType = 'div'>({
  as,
  p,
  px,
  py,
  m,
  mx,
  my,
  mt,
  mb,
  rounded,
  bg,
  border,
  shadow,
  display,
  w,
  maxW,
  className,
  children,
  ref,
  ...props
}: BoxProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      ref={ref}
      className={cn(
        boxVariants({
          p,
          px,
          py,
          m,
          mx,
          my,
          mt,
          mb,
          rounded,
          bg,
          border,
          shadow,
          display,
          w,
          maxW,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

Box.displayName = 'Box'

export { boxVariants }
export type { BoxVariantProps }
