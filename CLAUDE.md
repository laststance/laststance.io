# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start Next.js development server
- `pnpm dev:network` - Start dev server accessible on network (192.168.1.4)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm gen` - Generate new blog post template (interactive CLI)

### Testing & Quality
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm playwright` - Run E2E tests with Playwright
- `pnpm playwright:ui` - Run Playwright tests with UI
- `pnpm playwright:debug` - Debug Playwright tests
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm prettier` - Format code with Prettier

### Development Tools
- `pnpm storybook` - Start Storybook dev server
- `pnpm analyze` - Build with bundle analysis

## Architecture

### Blog System
- Blog posts are MDX files located in `src/app/articles/[slug]/page.mdx`
- Each post requires frontmatter with `title`, `author`, `date`, and `description`
- The `pnpm gen` script creates new blog posts with proper structure
- Articles are auto-discovered via `src/lib/articles.ts` using fast-glob

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with Tailwind UI components
- **Content**: MDX with rehype-prism for syntax highlighting
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Linting**: ESLint with ts-prefixer config, Prettier for formatting
- **Package Manager**: pnpm

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

### Content Management
- Blog posts use MDX with frontmatter
- GitHub integration via Octokit for displaying projects
- RSS feed generated at `/feed.xml`
- OpenGraph images generated via API route

## Testing Strategy
- Unit tests for components using Vitest + Testing Library
- E2E tests across multiple devices (Chrome, iPad Pro 11, iPhone 14)
- Visual regression testing with Argos CI
- Playwright runs with production build (`pnpm start`)

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