/**
 * Design Tokens - Laststance.io Design System
 *
 * This file defines all design tokens used throughout the application.
 * Design tokens are the visual design atoms of the design system — specifically,
 * they are named entities that store visual design attributes.
 *
 * @example
 * import { typography, spacing, colors } from '@/lib/design-tokens'
 * <Text variant="body">{typography.body.fontSize}</Text>
 */

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Typography scale based on 1.25 ratio (Major Third)
 * Base size: 18px for improved readability
 *
 * @example
 * typography.body.fontSize // '1.125rem' (18px)
 * typography.h1.fontSize // '2.5rem' (40px)
 */
export const typography = {
  // Display headings (for hero sections)
  display: {
    fontSize: '3rem', // 48px
    lineHeight: '1.1',
    fontWeight: '800',
    letterSpacing: '-0.025em',
  },

  // Heading 1 - Page titles
  h1: {
    fontSize: '2.5rem', // 40px (was 2rem/32px - increased)
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },

  // Heading 2 - Section titles
  h2: {
    fontSize: '2rem', // 32px (was 1.5rem/24px - increased)
    lineHeight: '1.25',
    fontWeight: '600',
    letterSpacing: '-0.015em',
  },

  // Heading 3 - Subsection titles
  h3: {
    fontSize: '1.5rem', // 24px (was 1.25rem/20px - increased)
    lineHeight: '1.35',
    fontWeight: '600',
    letterSpacing: '-0.01em',
  },

  // Heading 4 - Card/component titles
  h4: {
    fontSize: '1.25rem', // 20px (was 1.125rem/18px - increased)
    lineHeight: '1.4',
    fontWeight: '600',
    letterSpacing: '-0.005em',
  },

  // Body large - For emphasized content
  bodyLarge: {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.7',
    fontWeight: '400',
    letterSpacing: '0',
  },

  // Body - Default text (INCREASED from 16px to 18px)
  body: {
    fontSize: '1.125rem', // 18px (was 1rem/16px)
    lineHeight: '1.75',
    fontWeight: '400',
    letterSpacing: '0',
  },

  // Body small - Secondary content
  bodySmall: {
    fontSize: '1rem', // 16px (was 0.875rem/14px)
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '0',
  },

  // Caption - Labels, meta info (INCREASED from 13px to 14px)
  caption: {
    fontSize: '0.875rem', // 14px (was 0.8125rem/13px)
    lineHeight: '1.5',
    fontWeight: '500',
    letterSpacing: '0.01em',
  },

  // Overline - Category labels, eyebrow text
  overline: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.5',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },

  // Code - Monospace text
  code: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.6',
    fontWeight: '400',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
} as const

/**
 * Typography variant keys for type-safe usage
 */
export type TypographyVariant = keyof typeof typography

// =============================================================================
// SPACING TOKENS (8pt Grid System)
// =============================================================================

/**
 * Spacing scale based on 8pt grid with 4pt for micro adjustments
 *
 * @example
 * spacing[4] // '1rem' (16px)
 * spacing[8] // '2rem' (32px)
 */
export const spacing = {
  0: '0',
  0.5: '0.125rem', // 2px - micro
  1: '0.25rem', // 4px - micro
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px - base unit
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
} as const

export type SpacingKey = keyof typeof spacing

/**
 * Named spacing for semantic usage
 */
export const spacingTokens = {
  /** Space between related elements (e.g., icon and text) */
  tight: spacing[2], // 8px
  /** Standard space between elements */
  normal: spacing[4], // 16px
  /** Space between sections or groups */
  relaxed: spacing[6], // 24px
  /** Large space for major section breaks */
  loose: spacing[8], // 32px
  /** Extra large space for hero/feature sections */
  spacious: spacing[12], // 48px
  /** Maximum space for page sections */
  expansive: spacing[16], // 64px
} as const

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Semantic color tokens
 * Uses CSS custom properties for theme support
 */
export const colors = {
  // Text colors
  text: {
    primary: 'hsl(var(--foreground))',
    secondary: 'hsl(var(--muted-foreground))',
    muted: 'hsl(var(--muted-foreground) / 0.7)',
    inverse: 'hsl(var(--background))',
    accent: 'rgb(20, 184, 166)', // teal-500
    link: 'rgb(20, 184, 166)',
    linkHover: 'rgb(13, 148, 136)', // teal-600
  },

  // Background colors
  background: {
    primary: 'hsl(var(--background))',
    secondary: 'hsl(var(--muted))',
    elevated: 'hsl(var(--card))',
    accent: 'hsl(var(--accent))',
  },

  // Border colors
  border: {
    default: 'hsl(var(--border))',
    muted: 'hsl(var(--border) / 0.5)',
    accent: 'rgb(20, 184, 166)',
  },

  // Semantic colors
  semantic: {
    success: 'rgb(34, 197, 94)', // green-500
    warning: 'rgb(234, 179, 8)', // yellow-500
    error: 'hsl(var(--destructive))',
    info: 'rgb(59, 130, 246)', // blue-500
  },
} as const

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border radius scale
 */
export const radii = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px - default (--radius)
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.25rem', // 20px
  full: '9999px',
} as const

export type RadiusKey = keyof typeof radii

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Shadow scale for elevation
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const

export type ShadowKey = keyof typeof shadows

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/**
 * Animation duration scale
 */
export const duration = {
  instant: '0ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const

/**
 * Animation easing functions
 */
export const easing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints (matching Tailwind defaults)
 */
export const breakpoints = {
  xs: '390px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// =============================================================================
// CSS CUSTOM PROPERTY MAPPINGS
// =============================================================================

/**
 * CSS custom properties for design tokens
 * Use these in global CSS or inline styles
 */
export const cssVars = {
  // Typography
  '--font-size-display': typography.display.fontSize,
  '--font-size-h1': typography.h1.fontSize,
  '--font-size-h2': typography.h2.fontSize,
  '--font-size-h3': typography.h3.fontSize,
  '--font-size-h4': typography.h4.fontSize,
  '--font-size-body-lg': typography.bodyLarge.fontSize,
  '--font-size-body': typography.body.fontSize,
  '--font-size-body-sm': typography.bodySmall.fontSize,
  '--font-size-caption': typography.caption.fontSize,
  '--font-size-overline': typography.overline.fontSize,
  '--font-size-code': typography.code.fontSize,

  // Spacing
  '--space-1': spacing[1],
  '--space-2': spacing[2],
  '--space-3': spacing[3],
  '--space-4': spacing[4],
  '--space-6': spacing[6],
  '--space-8': spacing[8],
  '--space-12': spacing[12],
  '--space-16': spacing[16],
} as const
