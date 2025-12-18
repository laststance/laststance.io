import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Card,
  CardTitle,
  CardDescription,
  CardCta,
  CardEyebrow,
} from './Card'

const meta: Meta<typeof Card> = {
  title: 'components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'A compound card component system for displaying content with titles, descriptions, eyebrows, and CTAs. Supports hover effects and link functionality.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  decorators: [
    () => (
      <Card>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content. It provides additional
          context about what the card represents.
        </CardDescription>
      </Card>
    ),
  ],
}

export const WithLink: Story = {
  decorators: [
    () => (
      <Card>
        <CardTitle href="/example">Linked Card Title</CardTitle>
        <CardDescription>
          Click the title to navigate. The entire card has a hover effect.
        </CardDescription>
      </Card>
    ),
  ],
}

export const WithEyebrow: Story = {
  decorators: [
    () => (
      <Card>
        <CardEyebrow>Category</CardEyebrow>
        <CardTitle href="/example">Article Title</CardTitle>
        <CardDescription>
          An article card with an eyebrow category label above the title.
        </CardDescription>
      </Card>
    ),
  ],
}

export const WithDecoratedEyebrow: Story = {
  decorators: [
    () => (
      <Card>
        <CardEyebrow decorate>December 19, 2025</CardEyebrow>
        <CardTitle href="/example">Blog Post Title</CardTitle>
        <CardDescription>
          A blog post card with a decorated date eyebrow featuring a vertical
          accent line.
        </CardDescription>
      </Card>
    ),
  ],
}

export const WithCta: Story = {
  decorators: [
    () => (
      <Card>
        <CardTitle href="/example">Project Name</CardTitle>
        <CardDescription>
          A project card with a call-to-action button that includes a chevron
          icon.
        </CardDescription>
        <CardCta>View Project</CardCta>
      </Card>
    ),
  ],
}

export const FullCard: Story = {
  decorators: [
    () => (
      <Card>
        <CardEyebrow decorate>Open Source</CardEyebrow>
        <CardTitle href="https://github.com/laststance">
          Laststance Projects
        </CardTitle>
        <CardDescription>
          A collection of open source projects and tools built with React,
          TypeScript, and modern web technologies.
        </CardDescription>
        <CardCta>Read more</CardCta>
      </Card>
    ),
  ],
}

export const AsArticle: Story = {
  decorators: [
    () => (
      <Card as="article">
        <CardEyebrow as="time" decorate dateTime="2025-12-19">
          December 19, 2025
        </CardEyebrow>
        <CardTitle>Building Modern Web Applications</CardTitle>
        <CardDescription>
          An exploration of modern web development practices using React 19,
          Next.js 15, and TypeScript.
        </CardDescription>
      </Card>
    ),
  ],
}

export const CardGrid: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            eyebrow: 'React',
            title: 'Component Architecture',
            description: 'Learn about building scalable React components.',
          },
          {
            eyebrow: 'TypeScript',
            title: 'Type-Safe Development',
            description: 'Leverage TypeScript for better developer experience.',
          },
          {
            eyebrow: 'Next.js',
            title: 'Full-Stack Framework',
            description: 'Build production-ready apps with Next.js.',
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardEyebrow>{item.eyebrow}</CardEyebrow>
            <CardTitle href="/example">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardCta>Learn more</CardCta>
          </Card>
        ))}
      </div>
    ),
  ],
}
