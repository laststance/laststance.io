# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Development Commands

### Build & Development
```bash
# Development with Turbopack (fast refresh) - runs on port 3939
pnpm dev

# Development on local network (for mobile testing)
pnpm dev:network

# Build for production (uses webpack, required before Playwright tests)
pnpm build

# Start production server on port 3939
pnpm start
```

### Testing Commands
```bash
# Unit tests (Vitest)
pnpm test                    # Run once
pnpm test:watch             # Watch mode
pnpm test:storybook         # Test Storybook components

# E2E tests (Playwright) - MUST build first
pnpm build                  # Required before running Playwright
pnpm playwright             # Run all E2E tests with list reporter
pnpm playwright test <file> # Run specific test file
pnpm playwright test -g 'pattern' # Run tests matching pattern
pnpm playwright:ui          # Interactive UI mode
pnpm playwright:headed      # Run with visible browser
pnpm playwright:debug       # Debug mode with inspector

# Visual testing (Storybook)
pnpm storybook              # Dev server on port 6066
pnpm build-storybook        # Build static Storybook
```

### Code Quality
```bash
# Type checking
pnpm typecheck              # Run once
pnpm typecheck:watch        # Watch mode

# Linting
pnpm lint                   # Check for issues
pnpm lint:fix              # Auto-fix issues

# Formatting
pnpm prettier               # Format all files
```

### Content Creation
```bash
# Generate new blog post template
pnpm gen                    # Interactive CLI for creating articles
```

## Project Architecture

### Technology Stack
- **Framework**: Next.js 16 with App Router (Turbopack in dev)
- **UI Library**: React 19 with Server Components
- **Styling**: Tailwind CSS v4 with custom UI components (shadcn-style)
- **Content**: MDX for articles with syntax highlighting (Prism)
- **Testing**: Vitest (unit), Playwright (E2E), Storybook 10 (component)
- **Monitoring**: Sentry for error tracking
- **Language**: TypeScript with strict mode
- **Package Manager**: pnpm with mize for Node version management

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── articles/          # Blog posts (MDX files in subdirectories)
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   ├── uses/              # Uses page
│   ├── keybinds/          # Keyboard shortcuts page
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout with theme provider
├── components/            
│   ├── ui/                # Reusable UI components (Dialog, Button, etc.)
│   ├── Header/            # Site navigation
│   └── [Component].tsx    # Page-specific components
├── lib/                   
│   ├── articles.ts        # Article loading and processing
│   ├── octokit.ts         # GitHub API integration
│   └── utils.ts           # Utility functions with cn() for classnames
└── hooks/                 # Custom React hooks
```

### Key Architectural Patterns

1. **Server Components by Default**: Components are Server Components unless marked with `.client.tsx` suffix or using `'use client'` directive

2. **Article System**: 
   - Articles stored as MDX files in `src/app/articles/[slug]/page.mdx`
   - Dynamic import system with metadata frontmatter
   - RSS feed generation at `/feed.xml`

3. **Theme System**: Dark/light mode with next-themes, system preference detection

4. **Testing Strategy**:
   - Unit tests colocated with source files (`*.test.ts`)
   - E2E tests in `/e2e` directory testing across devices
   - Visual regression with Argos CI integration

5. **Environment Configuration**:
   - `.env.local` for local development
   - Required: `NEXT_PUBLIC_SITE_URL`, `PERSONAL_ACCESS_TOKEN` (GitHub)

### Playwright Testing Requirements

1. **Always build before testing**: `pnpm build` is mandatory before `pnpm playwright`
2. **Use production server**: Config uses `pnpm start` not `pnpm dev`
3. **Force interactions**: Use `{ force: true }` for all Playwright actions
4. **Reporter settings**: Use `--reporter=list` to avoid HTML reporter issues
5. **Test devices**: Chrome desktop, iPad Pro 11 (both orientations), iPhone 14

### Component Development Patterns

1. **UI Components**: Located in `src/components/ui/`, follow shadcn conventions
2. **Styling**: Use Tailwind classes with `cn()` utility for conditional classes
3. **Icons**: Lucide React for icons, custom icons in `src/components/icons/`
4. **Links**: Use custom `Link` component for internal navigation

### Content Management

1. **Blog Posts**: Create with `pnpm gen`, generates MDX with frontmatter
2. **Images**: Optimized with Next.js Image component, multiple formats
3. **SEO**: Metadata exports in pages, sitemap generation, OG images

### API Integration

- GitHub API via Octokit for fetching repository data
- Rate limiting considerations for GitHub API calls
- Caching strategies for external data

### Development Workflow

1. Use tmux for background processes (dev servers)
2. Node.js 24.x required (managed by Volta)
3. Strict TypeScript with comprehensive type checking
4. ESLint with Next.js specific rules
5. Prettier with Tailwind plugin for consistent formatting

### CI/CD Pipeline

- GitHub Actions for build, lint, typecheck, and tests
- Separate workflows for different device tests
- Argos CI for visual regression testing
- Dependabot for dependency updates