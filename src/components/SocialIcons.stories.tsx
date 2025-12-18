import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from './SocialIcons'

const meta: Meta = {
  title: 'components/SocialIcons',
  parameters: {
    docs: {
      description: {
        component:
          'Social media icon components for Twitter, Instagram, GitHub, and LinkedIn. All icons accept standard SVG props.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Twitter: Story = {
  render: () => (
    <TwitterIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
  ),
}

export const Instagram: Story = {
  render: () => (
    <InstagramIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
  ),
}

export const GitHub: Story = {
  render: () => (
    <GitHubIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
  ),
}

export const LinkedIn: Story = {
  render: () => (
    <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
  ),
}

export const AllIcons: Story = {
  render: () => (
    <div className="flex gap-6">
      <TwitterIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
      <InstagramIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
      <GitHubIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
      <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition hover:fill-zinc-600 dark:fill-zinc-400 dark:hover:fill-zinc-300" />
    </div>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-zinc-500 dark:text-zinc-400">
          Small
        </span>
        <div className="flex gap-4">
          <GitHubIcon className="h-4 w-4 fill-zinc-500" />
          <TwitterIcon className="h-4 w-4 fill-zinc-500" />
          <LinkedInIcon className="h-4 w-4 fill-zinc-500" />
          <InstagramIcon className="h-4 w-4 fill-zinc-500" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-zinc-500 dark:text-zinc-400">
          Medium
        </span>
        <div className="flex gap-4">
          <GitHubIcon className="h-6 w-6 fill-zinc-500" />
          <TwitterIcon className="h-6 w-6 fill-zinc-500" />
          <LinkedInIcon className="h-6 w-6 fill-zinc-500" />
          <InstagramIcon className="h-6 w-6 fill-zinc-500" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-zinc-500 dark:text-zinc-400">
          Large
        </span>
        <div className="flex gap-4">
          <GitHubIcon className="h-8 w-8 fill-zinc-500" />
          <TwitterIcon className="h-8 w-8 fill-zinc-500" />
          <LinkedInIcon className="h-8 w-8 fill-zinc-500" />
          <InstagramIcon className="h-8 w-8 fill-zinc-500" />
        </div>
      </div>
    </div>
  ),
}

export const WithColors: Story = {
  render: () => (
    <div className="flex gap-6">
      <TwitterIcon className="h-6 w-6 fill-sky-500" />
      <InstagramIcon className="h-6 w-6 fill-pink-500" />
      <GitHubIcon className="h-6 w-6 fill-zinc-900 dark:fill-white" />
      <LinkedInIcon className="h-6 w-6 fill-blue-600" />
    </div>
  ),
}

export const AsLinks: Story = {
  render: () => (
    <div className="flex gap-6">
      <a
        href="https://twitter.com"
        className="group"
        aria-label="Follow on Twitter"
      >
        <TwitterIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-sky-500" />
      </a>
      <a
        href="https://instagram.com"
        className="group"
        aria-label="Follow on Instagram"
      >
        <InstagramIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-pink-500" />
      </a>
      <a
        href="https://github.com"
        className="group"
        aria-label="Follow on GitHub"
      >
        <GitHubIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-900 dark:group-hover:fill-white" />
      </a>
      <a
        href="https://linkedin.com"
        className="group"
        aria-label="Follow on LinkedIn"
      >
        <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-blue-600" />
      </a>
    </div>
  ),
}
