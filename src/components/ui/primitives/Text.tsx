import { type VariantProps, cva } from 'class-variance-authority'
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

import { spacingVariants } from './spacing'

/**
 * Text component style variants using CVA (Class Variance Authority)
 *
 * Responsive 3-step typography scale (mobile → tablet → desktop):
 * - body: 16px → 18px → 20px
 * - All headings scale proportionally
 * - Colors updated for WCAG AA+ contrast
 */
const textVariants = cva('', {
  variants: {
    /**
     * Typography variant — responsive 3-step sizing
     * Mobile (default) → sm: (640px+) → lg: (1024px+)
     */
    variant: {
      // Display - Hero sections: 36px → 48px → 60px
      display:
        'text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl',

      // H1 - Page titles: 30px → 36px → 48px
      h1: 'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',

      // H2 - Section titles: 24px → 30px → 36px
      h2: 'text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl',

      // H3 - Subsection titles: 20px → 24px → 28px
      h3: 'text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl',

      // H4 - Card titles: 18px → 20px → 24px
      h4: 'text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl',

      // Body large - Lead paragraphs: 18px → 20px → 22px
      bodyLarge: 'text-lg leading-relaxed sm:text-xl lg:text-[1.375rem]',

      // Body - Default text: 16px → 18px → 20px
      body: 'text-base leading-relaxed sm:text-lg lg:text-xl',

      // Body small - Secondary content: 14px → 16px → 18px
      bodySmall: 'text-sm leading-relaxed sm:text-base lg:text-lg',

      // Caption - Meta info: 14px → 14px → 16px
      caption: 'text-sm font-medium leading-normal tracking-wide lg:text-base',

      // Overline - Category labels: 12px → 12px → 14px
      overline:
        'text-xs font-semibold uppercase leading-normal tracking-widest lg:text-sm',

      // Code - Monospace: 14px → 16px → 18px (line-height 1.45)
      code: 'font-mono text-sm leading-[1.45] sm:text-base lg:text-lg',
    },

    /**
     * Color variant — updated for WCAG AA+ contrast
     */
    color: {
      default: 'text-zinc-900 dark:text-zinc-50',
      muted: 'text-zinc-600 dark:text-zinc-300',
      accent: 'text-teal-700 dark:text-teal-400',
      inherit: 'text-inherit',
      inverse: 'text-zinc-50 dark:text-zinc-900',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
    },

    /** Text alignment */
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },

    /** Font weight override */
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    /** Text transform */
    transform: {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      none: 'normal-case',
    },

    /** Italic style */
    italic: {
      true: 'italic',
      false: '',
    },

    /** Truncation behavior */
    truncate: {
      true: 'truncate',
      false: '',
    },

    /** Line clamp for multi-line truncation */
    clamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      none: '',
    },

    // Shared spacing variants (from spacing.ts — single source of truth)
    ...spacingVariants,
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
    italic: false,
    truncate: false,
    clamp: 'none',
  },
})

type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>

type TextVariantProps = VariantProps<typeof textVariants>

/**
 * Own props for the Text component (excluding element-specific props).
 */
type TextOwnProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & TextVariantProps

/**
 * Full props — merges own props with the chosen element's native props.
 * Generic `T` enables type-safe polymorphism:
 * - `<Text as="a" href="/foo">` → href is valid
 * - `<Text as="span" href="/foo">` → TypeScript error
 */
type TextProps<T extends ElementType = 'p'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>

/**
 * Maps a text variant to its default semantic HTML element.
 *
 * @param variant - The typography variant
 * @returns The appropriate HTML element type
 *
 * @example
 * getDefaultElement('h1')      // 'h1'
 * getDefaultElement('body')    // 'p'
 * getDefaultElement('caption') // 'span'
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
 * Supports MUI-style spacing props via shared spacingVariants:
 * - mt, mb, mx, my, p, px, py
 *
 * @param variant - Typography variant (display, h1-h4, body, bodyLarge, bodySmall, caption, overline, code)
 * @param color - Text color (default, muted, accent, inherit, inverse, success, warning, error)
 * @param align - Text alignment (left, center, right, justify)
 * @param weight - Font weight override (normal, medium, semibold, bold)
 * @param transform - Text transform (uppercase, lowercase, capitalize, none)
 * @param italic - Enable italic style
 * @param truncate - Enable single-line truncation with ellipsis
 * @param clamp - Multi-line truncation (1-4 lines)
 * @param mt/mb/mx/my/p/px/py - Spacing props from 8pt grid scale
 * @param as - Override the default HTML element
 *
 * @example
 * // Page title
 * <Text variant="h1">Welcome to Laststance.io</Text>
 *
 * // Body text with muted color and top margin
 * <Text variant="body" color="muted" mt={6}>
 *   Secondary information about the project.
 * </Text>
 *
 * // Overline category label
 * <Text variant="overline" color="accent">
 *   Featured Project
 * </Text>
 *
 * // Polymorphic: renders as anchor with type-safe href
 * <Text as="a" variant="body" color="accent" href="/projects">
 *   View all projects
 * </Text>
 */
export function Text<T extends ElementType = 'p'>({
  as,
  variant = 'body',
  color,
  align,
  weight,
  transform,
  italic,
  truncate,
  clamp,
  mt,
  mb,
  mx,
  my,
  m,
  p,
  px,
  py,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Component = as ?? getDefaultElement(variant)

  return (
    <Component
      className={cn(
        textVariants({
          variant,
          color,
          align,
          weight,
          transform,
          italic,
          truncate,
          clamp,
          mt,
          mb,
          mx,
          my,
          m,
          p,
          px,
          py,
        }),
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
