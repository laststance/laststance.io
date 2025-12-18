import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Image from 'next/image'

import { AvatarContainer } from './AvatarContainer'

const meta: Meta<typeof AvatarContainer> = {
  title: 'components/Header/AvatarContainer',
  component: AvatarContainer,
  parameters: {
    docs: {
      description: {
        component:
          'A styled container for avatar images with shadow, ring, and backdrop blur effects. Provides consistent styling for avatar presentations.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AvatarContainer>

export const Default: Story = {
  decorators: [
    () => (
      <AvatarContainer>
        <div className="h-full w-full rounded-full bg-gradient-to-br from-teal-400 to-teal-600" />
      </AvatarContainer>
    ),
  ],
}

export const WithImage: Story = {
  decorators: [
    () => (
      <AvatarContainer>
        <Image
          src="https://github.com/ryota-murakami.png"
          alt="Avatar"
          width={40}
          height={40}
          className="h-full w-full rounded-full object-cover"
        />
      </AvatarContainer>
    ),
  ],
}

export const CustomSize: Story = {
  decorators: [
    () => (
      <div className="flex items-center gap-4">
        <AvatarContainer className="h-8 w-8">
          <div className="h-full w-full rounded-full bg-teal-500" />
        </AvatarContainer>
        <AvatarContainer>
          <div className="h-full w-full rounded-full bg-teal-500" />
        </AvatarContainer>
        <AvatarContainer className="h-16 w-16">
          <div className="h-full w-full rounded-full bg-teal-500" />
        </AvatarContainer>
      </div>
    ),
  ],
}

export const InHeader: Story = {
  decorators: [
    () => (
      <header className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <AvatarContainer>
          <Image
            src="https://github.com/ryota-murakami.png"
            alt="Avatar"
            width={40}
            height={40}
            className="h-full w-full rounded-full object-cover"
          />
        </AvatarContainer>
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            Ryota Murakami
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Software Engineer
          </p>
        </div>
      </header>
    ),
  ],
}
