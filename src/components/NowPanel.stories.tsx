import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NowPanel } from '@/app/page/NowPanel'

const meta: Meta<typeof NowPanel> = {
  title: 'components/NowPanel',
  component: NowPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Static "Now" panel — author-written current focus. Replaces the old GitHub
activity feed with present intent instead of past commits.

**Design notes (DESIGN.md §6):**
- No motion, no fetch, no skeleton — "static by design" exception clause.
- Edits flow through \`src/lib/now.ts\` only (no runtime CMS).
- Returns \`null\` when \`NOW_ITEMS\` is empty so layout collapses cleanly.

**Visual contract:**
- 2px zinc left rail on each row (matches DESIGN.md §3 quiet hierarchy).
- Hover on linked rows fades title to teal (single-accent token).
- Date in \`Updated YYYY-MM-DD\` is mono caption.
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NowPanel>

/**
 * Production state — reads live `NOW_ITEMS` and `NOW_UPDATED_AT` from
 * `src/lib/now.ts`. Whatever the author has committed is what shows here.
 * Updating the array updates this story automatically.
 */
export const Default: Story = {}
