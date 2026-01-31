import { type VariantProps, cva } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Stack component style variants using CVA
 *
 * Implements the 8pt grid spacing system for consistent layout.
 * Stack provides vertical or horizontal arrangement with consistent gaps.
 */
const stackVariants = cva('flex', {
  variants: {
    /**
     * Direction of the stack
     */
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },

    /**
     * Gap between items based on 8pt grid
     */
    gap: {
      0: 'gap-0',
      1: 'gap-1', // 4px
      2: 'gap-2', // 8px
      3: 'gap-3', // 12px
      4: 'gap-4', // 16px
      5: 'gap-5', // 20px
      6: 'gap-6', // 24px
      8: 'gap-8', // 32px
      10: 'gap-10', // 40px
      12: 'gap-12', // 48px
      16: 'gap-16', // 64px
    },

    /**
     * Alignment along the cross axis
     */
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },

    /**
     * Justification along the main axis
     */
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },

    /**
     * Wrap behavior
     */
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },

    /**
     * Full width/height
     */
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: 4,
    align: 'stretch',
    justify: 'start',
    wrap: false,
    fullWidth: false,
  },
})

type StackVariantProps = VariantProps<typeof stackVariants>

type StackProps = {
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
  children: React.ReactNode
} & StackVariantProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof StackVariantProps>

/**
 * Stack component for consistent vertical or horizontal layouts.
 *
 * Uses the 8pt grid system for spacing between items.
 *
 * @param direction - Stack direction: 'vertical' (column) or 'horizontal' (row)
 * @param gap - Space between items (0-16, based on 8pt grid)
 * @param align - Cross-axis alignment (start, center, end, stretch, baseline)
 * @param justify - Main-axis justification (start, center, end, between, around, evenly)
 * @param wrap - Enable flex wrapping
 * @param fullWidth - Make stack full width
 * @param as - Override default div element
 *
 * @example
 * // Vertical stack with 24px gap
 * <Stack gap={6}>
 *   <Text variant="h2">Section Title</Text>
 *   <Text variant="body">Section content goes here.</Text>
 * </Stack>
 *
 * // Horizontal stack with centered alignment
 * <Stack direction="horizontal" gap={4} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Stack>
 *
 * // Full-width stack with space-between
 * <Stack direction="horizontal" justify="between" fullWidth>
 *   <Logo />
 *   <Navigation />
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction,
      gap,
      align,
      justify,
      wrap,
      fullWidth,
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
          stackVariants({ direction, gap, align, justify, wrap, fullWidth }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

/**
 * VStack - Vertical Stack shorthand
 *
 * @example
 * <VStack gap={4}>
 *   <Item />
 *   <Item />
 * </VStack>
 */
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />
)
VStack.displayName = 'VStack'

/**
 * HStack - Horizontal Stack shorthand
 *
 * @example
 * <HStack gap={4} align="center">
 *   <Icon />
 *   <Label />
 * </HStack>
 */
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />
)
HStack.displayName = 'HStack'

export { stackVariants }
export type { StackVariantProps }
