# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm dev` - Start Next.js development server
- `pnpm dev:network` - Start dev server accessible on network (192.168.1.4)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm gen` - Generate new blog post template (interactive CLI)
- `pnpm clean` - Remove .next, node_modules, tsconfig.tsbuildinfo, pnpm-lock.yaml

### Testing & Quality

- `pnpm test` - Run unit tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm playwright` - Run E2E tests with Playwright
- `pnpm playwright:ui` - Run Playwright tests with UI
- `pnpm playwright:debug` - Debug Playwright tests
- `pnpm playwright:headed` - Run Playwright tests with visible browser
- `pnpm playwright:codegen` - Generate Playwright test code
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm typecheck:watch` - Run TypeScript checking in watch mode
- `pnpm prettier` - Format code with Prettier

### Development Tools

- `pnpm storybook` - Start Storybook dev server (port 6066)
- `pnpm build-storybook` - Build Storybook for production
- `pnpm test:storybook` - Run Storybook-specific tests
- `pnpm test:storybook:watch` - Run Storybook tests in watch mode
- `pnpm analyze` - Build with bundle analysis (or use `ANALYZE=true pnpm build`)

## Architecture

### Blog System

- Blog posts are MDX files located in `src/app/articles/[slug]/page.mdx`
- Each post requires frontmatter with `title`, `author`, `date`, and `description`
- The `pnpm gen` script creates new blog posts with proper structure
- Articles are auto-discovered via `src/lib/articles.ts` using fast-glob

### Tech Stack

- **Framework**: Next.js 15 with App Router
  - Experimental MDX Rust compiler enabled (`mdxRs: true`)
- **Styling**: Tailwind CSS v4 with Tailwind UI components
  - Custom Prism theme for syntax highlighting
- **Content**: MDX with rehype-prism for syntax highlighting
- **Testing**: Vitest for unit tests, Playwright for E2E
  - Storybook with Vitest addon for component testing
  - Chromatic integration for visual testing
- **Linting**: ESLint with ts-prefixer config, Prettier for formatting
  - Husky + lint-staged for pre-commit hooks
- **Package Manager**: pnpm
- **Node Version**: 22.x (managed via Volta)

### Key Directories

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and shared logic
- `e2e/` - Playwright E2E tests
- `examples/` - Component examples

### Environment Variables

Required `.env.local` file:

```
NEXT_PUBLIC_SITE_URL=https://example.com
PERSONAL_ACCESS_TOKEN=ghp_...
```

Environment variables are validated with Zod in `src/env.mjs`:

- `PERSONAL_ACCESS_TOKEN` must start with `ghp_`
- `NEXT_PUBLIC_SITE_URL` must be a valid URL

### Content Management

- Blog posts use MDX with frontmatter
- GitHub integration via Octokit for displaying projects
- RSS feed generated at `/feed.xml`
- OpenGraph images generated via API route

## Testing Strategy

- Unit tests for components using Vitest + Testing Library
  - Test files pattern: `src/**/*.{spec,test}.{js,jsx,ts,tsx}`
  - Uses `happy-dom` environment with global test utilities
  - Setup file: `setupTests.ts`
- E2E tests across multiple devices (Chrome, iPad Pro 11, iPhone 14)
  - Tests located in `./e2e/` directory
  - Runs against production build (`pnpm start`)
  - Base URL: `http://localhost:3000`
  - Trace collection on failure for debugging
- Visual regression testing with Argos CI
- Storybook tests with separate Vitest configuration

## Blog Post `page.mdx` format

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const article = {
  auhtor: 'Ryota Murakami',
  title: 'react-hook-form examples',
  date: '2024-05-21',
  description: 'from original repository',
}

export const metadata = {
  title: article.title,
  description: article.description,
  openGraph: {
    title: article.title,
    images: [`/api/og?title=${article.title}`],
  },
}

export default (props) => <ArticleLayout article={article} {...props} />

blog post body here.
```

see src/app/articles/react-hook-form-examples/page.mdx for more details.

## Build Details

- Uses `@t3-oss/env-nextjs` for environment validation
- Path alias configured: `@` maps to project root
- Storybook stories in `src/components/*.mdx` and `src/**/*.stories.*`
- Article images stored within article directories (e.g., `/src/app/articles/[slug]/images/`)
