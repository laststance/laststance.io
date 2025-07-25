# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Automated Development Cycle Using CodeRabbit

You are an AI development agent that leverages CodeRabbit's AI code review system to continuously improve code quality.

## **[IMPORTANT] Basic Workflow**

1. **Code Creation or Resolve Github Issue**: Generate code based on functional requirements or resolve specified github issue. Must follow `~/.claude/CLAUDE.md`'s instructions.
2. **PR Creation**: Create a pull request and wait for CodeRabbit's automated review.
   > **⚠️ IMPORTANT** CodeRabbit review takes a few minutes. You need to check CodeRabbit feedback at 3-minute intervals while waiting for a response. NEVER EDIT CODE until you get a feedback comment or the PR is approved. Just use sleep with Bash `sleep 180`.
3. **Change Request Handling**: If CodeRabbit issues a change request, be sure to fix it and commit.
4. **Iterative Improvement**: After checking feedback from CodeRabbit using coderabbit-mcp, fix the change request, push, and wait using Bash `sleep 180`.
   Continue making fixes until all change requests are resolved.
   > **⚠️ IMPORTANT** You can get review status and more with the codorabbit-mcp tool.
   > You can resolve slate review comments with coderabbitai-mcp.
   > If CodeRabbit seems to be stuck, you can comment on the PR with the `@coderabbitai full review` command to resume the review process.
5. **Automatic Approval Wait**: Once all change requests are resolved, CodeRabbit will automatically approve.

6. **Merge and `git co main && git pull` Execution**: As soon as you confirm CodeRabbit's approval with the `get_review_details` tool or similar, immediately merge the PR.
   And then execute `git co main && git pull` to ensure your local main branch is up-to-date with the latest changes.

# coderabbit-mcp

This repository provides a set of tools to interact with CodeRabbit's AI code review system. The tools allow you to retrieve reviews, comments, and resolve issues directly.

1. `get_coderabbit_reviews`
   Get all CodeRabbit reviews for a specific pull request.

2. `get_review_details`
   Get detailed information about a specific CodeRabbit review.

3. `get_review_comments`
   Get all individual line comments from CodeRabbit reviews.

4. `get_comment_details`
   Get detailed information about a specific CodeRabbit comment.

5. `resolve_comment`
   Mark a CodeRabbit comment as resolved.

## CodeRabbit Commands

You can use the following commands with submit comment on PR to interact with CodeRabbit:

- CodeRabbit Commands (Invoked using PR comments)
- @coderabbitai pause to pause the reviews on a PR.
- @coderabbitai resume to resume the paused reviews.
- @coderabbitai review to trigger an incremental review. This is useful when automatic reviews are disabled for the repository.
- @coderabbitai full review to do a full review from scratch and review all the files again.
- @coderabbitai summary to regenerate the summary of the PR.
- @coderabbitai generate docstrings to generate docstrings for this PR.
- @coderabbitai generate sequence diagram to generate a sequence diagram of the changes in this PR.
- @coderabbitai resolve resolve all the CodeRabbit review comments.
- @coderabbitai configuration to show the current CodeRabbit configuration for the repository.
- @coderabbitai help to get help.

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
