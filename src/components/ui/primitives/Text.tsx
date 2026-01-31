import { type VariantProps, cva } from 'class-variance-authority'
import { type ElementType, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Text component style variants using CVA (Class Variance Authority)
 *
 * Implements the typography scale from design tokens with semantic variants.
 * All font sizes are increased for improved readability:
 * - body: 18px (up from 16px)
 * - caption: 14px (up from 13px)
 * - All headings scaled proportionally
 */
const textVariants = cva('', {
  variants: {
    /**
     * Typography variant determines font size, weight, and line height
     */
    variant: {
      // Display - Hero sections, 48px
      display:
        'text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl',

      // H1 - Page titles, 40px (increased from 32px)
      h1: 'text-4xl font-bold leading-tight tracking-tight sm:text-5xl',

      // H2 - Section titles, 32px (increased from 24px)
      h2: 'text-3xl font-semibold leading-snug tracking-tight sm:text-4xl',

      // H3 - Subsection titles, 24px (increased from 20px)
      h3: 'text-2xl font-semibold leading-snug tracking-tight sm:text-3xl',

      // H4 - Card titles, 20px (increased from 18px)
      h4: 'text-xl font-semibold leading-normal tracking-tight sm:text-2xl',

      // Body large - Emphasized content, 20px
      bodyLarge: 'text-lg leading-relaxed sm:text-xl',

      // Body - Default text, 18px (increased from 16px)
      body: 'text-base leading-relaxed sm:text-lg',

      // Body small - Secondary content, 16px (increased from 14px)
      bodySmall: 'text-sm leading-relaxed sm:text-base',

      // Caption - Meta info, 14px (increased from 13px)
      caption: 'text-sm font-medium leading-normal tracking-wide',

      // Overline - Category labels, 12px
      overline: 'text-xs font-semibold uppercase leading-normal tracking-widest',

      // Code - Monospace text, 15px
      code: 'font-mono text-sm leading-relaxed sm:text-base',
    },

    /**
     * Color variant for text styling
     */
    color: {
      default: 'text-zinc-800 dark:text-zinc-100',
      muted: 'text-zinc-600 dark:text-zinc-400',
      accent: 'text-teal-600 dark:text-teal-400',
      inherit: 'text-inherit',
      inverse: 'text-zinc-100 dark:text-zinc-800',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
    },

    /**
     * Text alignment
     */
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },

    /**
     * Font weight override
     */
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    /**
     * Truncation behavior
     */
    truncate: {
      true: 'truncate',
      false: '',
    },

    /**
     * Line clamp for multi-line truncation
     */
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
    truncate: false,
    clamp: 'none',
  },
})

type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>

type TextVariantProps = VariantProps<typeof textVariants>

type TextProps = {
  /**
   * Override the default element type
   * @example
   * <Text as="span" variant="body">Inline text</Text>
   */
  as?: ElementType
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Children content
   */
  children: ReactNode
} & TextVariantProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'color'>

/**
 * Get the default element for a text variant
 */
function getDefaultElement(variant: TextVariant | null | undefined): ElementType {
  switch (variant) {
    case 'display':
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'code':
      return 'code'
    case 'caption':
    case 'overline':
      return 'span'
    case 'body':
    case 'bodyLarge':
    case 'bodySmall':
    default:
      return 'p'
  }
}

/**
 * Text component for consistent typography across the application.
 *
 * Uses semantic HTML elements by default based on variant:
 * - display, h1-h4 → heading elements
 * - body variants → p element
 * - caption, overline → span element
 * - code → code element
 *
 * @param variant - Typography variant (display, h1-h4, body, bodyLarge, bodySmall, caption, overline, code)
 * @param color - Text color (default, muted, accent, inherit, inverse, success, warning, error)
 * @param align - Text alignment (left, center, right)
 * @param weight - Font weight override (normal, medium, semibold, bold)
 * @param truncate - Enable single-line truncation with ellipsis
 * @param clamp - Multi-line truncation (1-4 lines)
 * @param as - Override the default HTML element
 *
 * @example
 * // Page title
 * <Text variant="h1">Welcome to Laststance.io</Text>
 *
 * // Body text with muted color
 * <Text variant="body" color="muted">
 *   Secondary information about the project.
 * </Text>
 *
 * // Truncated card description
 * <Text variant="bodySmall" clamp={2}>
 *   Long description that will be truncated after two lines...
 * </Text>
 *
 * // Overline category label
 * <Text variant="overline" color="accent">
 *   Featured Project
 * </Text>
 */
export function Text({
  as,
  variant = 'body',
  color,
  align,
  weight,
  truncate,
  clamp,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as ?? getDefaultElement(variant)

  return (
    <Component
      className={cn(
        textVariants({ variant, color, align, weight, truncate, clamp }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

Text.displayName = 'Text'

export { textVariants }
export type { TextVariantProps }
