import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Box component style variants using CVA
 *
 * A fundamental layout primitive for consistent spacing.
 * Implements the 8pt grid system for padding and margin.
 */
const boxVariants = cva('', {
  variants: {
    /**
     * Padding (all sides)
     */
    p: {
      0: 'p-0',
      1: 'p-1', // 4px
      2: 'p-2', // 8px
      3: 'p-3', // 12px
      4: 'p-4', // 16px
      5: 'p-5', // 20px
      6: 'p-6', // 24px
      8: 'p-8', // 32px
      10: 'p-10', // 40px
      12: 'p-12', // 48px
      16: 'p-16', // 64px
    },

    /**
     * Horizontal padding
     */
    px: {
      0: 'px-0',
      1: 'px-1',
      2: 'px-2',
      3: 'px-3',
      4: 'px-4',
      5: 'px-5',
      6: 'px-6',
      8: 'px-8',
      10: 'px-10',
      12: 'px-12',
      16: 'px-16',
    },

    /**
     * Vertical padding
     */
    py: {
      0: 'py-0',
      1: 'py-1',
      2: 'py-2',
      3: 'py-3',
      4: 'py-4',
      5: 'py-5',
      6: 'py-6',
      8: 'py-8',
      10: 'py-10',
      12: 'py-12',
      16: 'py-16',
    },

    /**
     * Margin (all sides)
     */
    m: {
      0: 'm-0',
      1: 'm-1',
      2: 'm-2',
      3: 'm-3',
      4: 'm-4',
      5: 'm-5',
      6: 'm-6',
      8: 'm-8',
      10: 'm-10',
      12: 'm-12',
      16: 'm-16',
      auto: 'm-auto',
    },

    /**
     * Horizontal margin
     */
    mx: {
      0: 'mx-0',
      1: 'mx-1',
      2: 'mx-2',
      3: 'mx-3',
      4: 'mx-4',
      5: 'mx-5',
      6: 'mx-6',
      8: 'mx-8',
      auto: 'mx-auto',
    },

    /**
     * Vertical margin
     */
    my: {
      0: 'my-0',
      1: 'my-1',
      2: 'my-2',
      3: 'my-3',
      4: 'my-4',
      5: 'my-5',
      6: 'my-6',
      8: 'my-8',
    },

    /**
     * Top margin
     */
    mt: {
      0: 'mt-0',
      1: 'mt-1',
      2: 'mt-2',
      3: 'mt-3',
      4: 'mt-4',
      5: 'mt-5',
      6: 'mt-6',
      8: 'mt-8',
      10: 'mt-10',
      12: 'mt-12',
      16: 'mt-16',
    },

    /**
     * Bottom margin
     */
    mb: {
      0: 'mb-0',
      1: 'mb-1',
      2: 'mb-2',
      3: 'mb-3',
      4: 'mb-4',
      5: 'mb-5',
      6: 'mb-6',
      8: 'mb-8',
    },

    /**
     * Border radius
     */
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm', // 4px
      md: 'rounded-md', // 8px
      lg: 'rounded-lg', // 12px
      xl: 'rounded-xl', // 16px
      '2xl': 'rounded-2xl', // 20px
      full: 'rounded-full',
    },

    /**
     * Background style
     */
    bg: {
      transparent: 'bg-transparent',
      primary: 'bg-background',
      secondary: 'bg-muted',
      elevated: 'bg-card',
      accent: 'bg-accent',
    },

    /**
     * Border style
     */
    border: {
      none: 'border-0',
      default: 'border border-border',
      muted: 'border border-border/50',
    },

    /**
     * Shadow
     */
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },

    /**
     * Display
     */
    display: {
      block: 'block',
      inline: 'inline',
      inlineBlock: 'inline-block',
      flex: 'flex',
      inlineFlex: 'inline-flex',
      grid: 'grid',
      hidden: 'hidden',
    },

    /**
     * Width
     */
    w: {
      auto: 'w-auto',
      full: 'w-full',
      screen: 'w-screen',
      max: 'w-max',
      min: 'w-min',
      fit: 'w-fit',
    },

    /**
     * Max width
     */
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

type BoxProps = {
  /**
   * Override the default element type
   */
  as?: React.ElementType
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Children content
   */
  children?: React.ReactNode
} & BoxVariantProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BoxVariantProps>

/**
 * Box component for consistent spacing and layout.
 *
 * A fundamental primitive that provides:
 * - Consistent padding/margin based on 8pt grid
 * - Background, border, and shadow options
 * - Width constraints
 * - Display options
 *
 * @param p - Padding (all sides)
 * @param px - Horizontal padding
 * @param py - Vertical padding
 * @param m - Margin (all sides)
 * @param mx - Horizontal margin
 * @param my - Vertical margin
 * @param mt - Top margin
 * @param mb - Bottom margin
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
 *   <Text variant="body" color="muted">Card content</Text>
 * </Box>
 *
 * // Section with vertical margin
 * <Box my={8}>
 *   <SectionContent />
 * </Box>
 *
 * // Constrained content area
 * <Box maxW="2xl" mx="auto" px={4}>
 *   <ArticleContent />
 * </Box>
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
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
      ...props
    },
    ref
  ) => {
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
)

Box.displayName = 'Box'

export { boxVariants }
export type { BoxVariantProps }
