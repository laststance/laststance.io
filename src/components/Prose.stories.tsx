import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Prose } from './Prose'

const meta: Meta<typeof Prose> = {
  title: 'components/Prose',
  component: Prose,
  parameters: {
    docs: {
      description: {
        component:
          'A typography wrapper component that applies Tailwind Typography prose styles for rendering rich content like blog posts and articles.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Prose>

export const Default: Story = {
  render: () => (
    <Prose>
      <h1>Typography Example</h1>
      <p>
        This is a paragraph demonstrating the prose typography styles. The Prose
        component applies consistent typography across your content.
      </p>
    </Prose>
  ),
}

export const Article: Story = {
  render: () => (
    <Prose>
      <h1>Building Modern Web Applications</h1>
      <p className="lead">
        A comprehensive guide to building scalable web applications with React,
        TypeScript, and modern tooling.
      </p>
      <h2>Introduction</h2>
      <p>
        Modern web development has evolved significantly over the past decade.
        Today, we have access to powerful frameworks and tools that make
        building complex applications more manageable than ever.
      </p>
      <h2>Key Technologies</h2>
      <ul>
        <li>
          <strong>React 19</strong> - The latest version with improved
          performance
        </li>
        <li>
          <strong>TypeScript</strong> - Type-safe JavaScript development
        </li>
        <li>
          <strong>Next.js 15</strong> - Full-stack React framework
        </li>
        <li>
          <strong>Tailwind CSS</strong> - Utility-first CSS framework
        </li>
      </ul>
      <h2>Code Example</h2>
      <pre>
        <code>{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}</code>
      </pre>
      <blockquote>
        <p>
          The best way to predict the future is to create it. — Peter Drucker
        </p>
      </blockquote>
    </Prose>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <Prose>
      <p>
        Check out the{' '}
        <a href="https://react.dev">official React documentation</a> for more
        information. You can also explore the{' '}
        <a href="https://nextjs.org">Next.js website</a> to learn about
        server-side rendering.
      </p>
    </Prose>
  ),
}

export const WithTable: Story = {
  render: () => (
    <Prose>
      <h2>Comparison Table</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>React</th>
            <th>Vue</th>
            <th>Angular</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Learning Curve</td>
            <td>Medium</td>
            <td>Easy</td>
            <td>Steep</td>
          </tr>
          <tr>
            <td>Performance</td>
            <td>Excellent</td>
            <td>Excellent</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>Ecosystem</td>
            <td>Vast</td>
            <td>Growing</td>
            <td>Comprehensive</td>
          </tr>
        </tbody>
      </table>
    </Prose>
  ),
}

export const WithClassName: Story = {
  render: () => (
    <Prose className="max-w-xl mx-auto">
      <h2>Constrained Width</h2>
      <p>
        This prose block has an additional max-width constraint applied via
        className. This is useful for centering content and maintaining
        readability on wide screens.
      </p>
    </Prose>
  ),
}
