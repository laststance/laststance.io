---
applyTo: '**/*.ts,**/*.tsx'
---

# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

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
