/**
 * Shared spacing variants for CVA-based primitives.
 * Single source of truth — spread into Box, Text, and any future primitives.
 *
 * Based on 8pt grid with 4pt for micro adjustments.
 *
 * @example
 * import { spacingVariants } from './spacing'
 * const myVariants = cva('', { variants: { ...spacingVariants, ...otherVariants } })
 */

export const spacingVariants = {
  /** Padding (all sides) */
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

  /** Horizontal padding */
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

  /** Vertical padding */
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

  /** Margin (all sides) */
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

  /** Horizontal margin */
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

  /** Vertical margin */
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

  /** Top margin */
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

  /** Bottom margin */
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
} as const

export type SpacingVariants = typeof spacingVariants
