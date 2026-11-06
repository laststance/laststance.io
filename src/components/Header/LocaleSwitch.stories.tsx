import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import { LocaleSwitch } from './LocaleSwitch'

const meta: Meta<typeof LocaleSwitch> = {
  title: 'components/Header/LocaleSwitch',
  component: LocaleSwitch,
  parameters: {
    docs: {
      description: {
        component:
          'Header link to the other language. The server performs the switch and remembers it in the NEXT_LOCALE cookie for a year. `pill` sits in the header from 640px; `menuRow` sits in the Menu panel below 640px.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LocaleSwitch>

export const Pill: Story = {
  args: { variant: 'pill' },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', {
      name: 'Switch language to 日本語',
    })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('hreflang', 'ja')
  },
}

export const MenuRow: Story = {
  args: { variant: 'menuRow' },
  decorators: [
    (Story) => (
      <div className="max-w-sm rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('heading', { name: 'Language' }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('link', { name: 'Switch language to 日本語' }),
    ).toBeVisible()
  },
}
