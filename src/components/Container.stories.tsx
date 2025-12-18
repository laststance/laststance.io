import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Container, ContainerOuter, ContainerInner } from './Container'

const meta: Meta<typeof Container> = {
  title: 'components/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component:
          'Layout container system with responsive padding and max-width constraints. Composed of ContainerOuter and ContainerInner for flexible layouts.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  decorators: [
    () => (
      <Container>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Container Example
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This content is wrapped in the default Container component, which
            applies responsive padding and max-width constraints.
          </p>
        </div>
      </Container>
    ),
  ],
}

export const OuterOnly: Story = {
  decorators: [
    () => (
      <ContainerOuter>
        <div className="bg-blue-100 dark:bg-blue-900 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            ContainerOuter Only
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This uses only ContainerOuter which provides the outer padding
            (sm:px-8) and the 7xl max-width wrapper.
          </p>
        </div>
      </ContainerOuter>
    ),
  ],
}

export const InnerOnly: Story = {
  decorators: [
    () => (
      <ContainerInner>
        <div className="bg-green-100 dark:bg-green-900 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            ContainerInner Only
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This uses only ContainerInner which provides mobile padding (px-4)
            and the 2xl/5xl max-width constraint.
          </p>
        </div>
      </ContainerInner>
    ),
  ],
}

export const Nested: Story = {
  decorators: [
    () => (
      <ContainerOuter className="bg-zinc-50 dark:bg-zinc-900 py-8">
        <ContainerInner>
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Full Nested Structure
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              This demonstrates the full container hierarchy with custom
              background color on the outer container.
            </p>
          </div>
        </ContainerInner>
      </ContainerOuter>
    ),
  ],
}

export const WithContent: Story = {
  decorators: [
    () => (
      <Container>
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Page Title
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              A subtitle describing the page content
            </p>
          </header>
          <main className="prose dark:prose-invert">
            <p>
              The Container component provides consistent horizontal padding and
              maximum width constraints for your content. It's the foundation of
              the site's layout system.
            </p>
            <p>
              On mobile devices, it applies smaller padding (px-4) while on
              larger screens it increases to sm:px-8 and lg:px-12.
            </p>
          </main>
        </div>
      </Container>
    ),
  ],
}

export const ResponsiveDemo: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <Container>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">
            <p className="dark:text-white">
              Resize the viewport to see responsive padding changes
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Mobile: px-4 | Tablet: sm:px-8 | Desktop: lg:px-12
            </p>
          </div>
        </Container>
      </div>
    ),
  ],
}
