---
applyTo: '**/*.ts,**/*.tsx'
---

# Project coding standards for TypeScript and React

Apply general coding best practices to all code.

## TypeScript Guidelines

- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines

- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use React.FC type for components with children
- Keep components small and focused
- Use CSS modules for component styling

---

## applyTo: "\*_/_.mdx"

# Storybook MDX Documentation Guide

This guide explains how to create and maintain MDX documentation for Storybook components in this project.

## Overview

MDX allows us to combine Markdown documentation with interactive Storybook components, creating rich, comprehensive documentation for our UI components.

## File Structure

For each component with Storybook stories, you can create a corresponding `.mdx` file:

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.stories.tsx
├── ComponentName.mdx          # ← MDX documentation
└── index.ts
```

## Basic MDX Template

Here's a basic template for creating MDX documentation:

```mdx
import {
  Meta,
  Story,
  Canvas,
  Controls,
  ArgsTable,
  Stories,
} from '@storybook/addon-docs'
import * as ComponentStories from './Component.stories'

<Meta of={ComponentStories} />

# Component Name

Brief description of what the component does and when to use it.

## Usage

<Canvas of={ComponentStories.Default} />

## Examples

### Example 1

<Canvas of={ComponentStories.Variant1} />

### Example 2

<Canvas of={ComponentStories.Variant2} />
```

---

## applyTo: "**/\*.tsx,**/\*.ts"

# Next.js App Router Patterns

This project follows these Next.js App Router patterns:

## Server vs Client Components

- Components are Server Components by default
- Client components are explicitly marked with `.client.tsx` suffix
- Minimize client component usage to essential interactivity

## Data Fetching

- Use Server Components for data fetching when possible
- API routes are defined in `src/app/api/` directory
- When fetching data, use `fetch` with appropriate caching directives

## Routing

- File-based routing via App Router
- `page.tsx` defines routes
- `layout.tsx` defines nested layouts
- `not-found.tsx` handles 404 errors
- `error.tsx` handles other errors
- Dynamic routes use `[param]` folder naming

## SEO

- Use metadata export in route segments
- The site has a sitemap generated in `src/app/sitemap.ts`
- OpenGraph images generated in `/api/og/` routes

## Page Organization

- Group related functionality in directories
- Keep page components focused on layout and composition
- Extract business logic to separate functions/hooks

---

## applyTo: "**/\*.tsx,**/\*.ts"

# Development Workflow

## Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm test` - Run Vitest tests
- `pnpm test:watch` - Run Vitest in watch mode
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm playwright` - Run Playwright E2E tests
- `pnpm prettier` - Format code with Prettier
- `pnpm storybook` - Run Storybook for component development
- `pnpm gen` - Generate blog template

## Development Process

1. Use the appropriate Node.js version (22.x)
2. Install dependencies with `pnpm install`
3. Run the development server with `pnpm dev`
4. Run type checking in watch mode with `pnpm typecheck:watch`
5. Before committing, ensure:
   - Tests pass (`pnpm test`)
   - Types check (`pnpm typecheck`)
   - Linting passes (`pnpm lint`)
   - Code is formatted (`pnpm prettier`)

---

## applyTo: "**/\*.tsx,**/\*.ts"

# Project Structure

The project follows a standard Next.js App Router structure:

- `src/app/` - App Router pages and layouts
  - `page.tsx` - Homepage
  - `layout.tsx` - Root layout with providers
  - Various route segments (`/about`, `/articles`, etc.)
- `src/components/` - Reusable React components
  - `Header/` - Site header components
  - `ui/` - UI component library (shadcn-style)
  - `icons/` - Icon components
- `src/lib/` - Utility functions and libraries
- `src/hooks/` - Custom React hooks
- `src/styles/` - Global styles and Tailwind configs
- `src/@types/` - TypeScript type definitions
- `src/images/` - Static images organized by type
- `e2e/` - Playwright end-to-end tests
- `public/` - Static assets served at root level

---

## applyTo: "**/\*.tsx,**/\*.ts"

# Essential Architecture Knowledge

## Technology Stack & Key Dependencies

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with custom design system
- **Content**: MDX for articles with Prism syntax highlighting
- **Testing**: Vitest (unit), Playwright (E2E), Storybook (components)
- **Package Manager**: pnpm with Volta for Node.js version management
- **UI Library**: Radix UI primitives with custom shadcn-style components
- **Icons**: Lucide React icons
- **Theme**: next-themes for dark/light mode with system preference detection

## Critical Patterns & Conventions

### Component Architecture

- **Server Components Default**: All components are Server Components unless marked `.client.tsx`
- **Client Components**: Use `.client.tsx` suffix for interactive components requiring browser APIs
- **UI Components**: Located in `src/components/ui/`, follow shadcn conventions with `cn()` utility
- **Styling**: Combine Tailwind classes with `cn()` from `src/lib/utils.ts` for conditional styling
- **Props Pattern**: Use discriminated unions for polymorphic components (see `Button.tsx`)

### Article/Content System

- **Structure**: Articles in `src/app/articles/[year]/[slug]/page.mdx` with frontmatter metadata
- **Generation**: Use `pnpm gen` to create new articles with proper template and JST timezone
- **Loading**: Dynamic imports via `src/lib/articles.ts` with glob pattern matching
- **Metadata**: Export `article` object and `metadata` for SEO in each MDX file

### Environment & Configuration

- **Required Variables**: `NEXT_PUBLIC_SITE_URL`, `PERSONAL_ACCESS_TOKEN` (GitHub API)
- **Node Version**: 22.x managed by Volta
- **Path Aliases**: `@/*` maps to `./src/*` for clean imports

## Development Workflows

### Testing Strategy

- **Unit Tests**: Colocated with source files (`*.test.ts`), run with `pnpm test`
- **E2E Tests**: In `/e2e` directory, test across Chrome, iPad Pro 11, iPhone 14
- **Build Requirement**: Always run `pnpm build` before `pnpm playwright` (uses production server)
- **Visual Testing**: Argos CI integration for visual regression testing

### GitHub Integration

- **API Access**: Octokit for GitHub API calls with rate limiting considerations
- **Personal Access Token**: Required for GitHub API integration
- **CI/CD**: GitHub Actions for build, lint, typecheck, and cross-device E2E tests

### Code Quality Pipeline

- **TypeScript**: Strict mode with comprehensive type checking (`pnpm typecheck`)
- **Linting**: ESLint with Next.js rules (`pnpm lint:fix` for auto-fix)
- **Formatting**: Prettier with Tailwind plugin (`pnpm prettier`)
- **Git Hooks**: Husky with lint-staged for pre-commit quality checks

## Common Patterns & Examples

### Button Component Pattern

```tsx
// Polymorphic component with discriminated unions
type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)
```

### Utility Function Pattern

```tsx
// cn() utility for conditional Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Theme Provider Pattern

```tsx
// Client component for theme management
<ThemeProvider attribute="class" disableTransitionOnChange>
  <ThemeWatcher />
  {children}
</ThemeProvider>
```

### Article Metadata Pattern

```tsx
export const article = {
  author: 'Ryota Murakami',
  title: 'Article Title',
  date: '2024-01-01', // JST timezone
  description: 'Article description',
}
```

## Troubleshooting & Gotchas

- **Playwright Tests**: Must build first (`pnpm build`) before running E2E tests
- **Force Interactions**: Use `{ force: true }` for all Playwright click actions
- **TypeScript Paths**: Always use `@/*` aliases, never relative paths like `../../../`
- **Client Components**: Only use when browser APIs or interactivity are required
- **GitHub API**: Handle rate limits and implement caching for external data
