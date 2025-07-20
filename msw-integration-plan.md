# MSW Integration Plan for Laststance.io

## Executive Summary

This document outlines a comprehensive plan for integrating Mock Service Worker (MSW) into the Laststance.io project, a Next.js 15 application using App Router. The integration will provide robust API mocking capabilities for development, testing, and Storybook environments.

## Current Project Analysis

### Architecture Overview

- **Framework**: Next.js 15 with App Router and Turbopack
- **Package Manager**: pnpm
- **Testing**: Vitest (unit), Playwright (E2E), Storybook (component)
- **Environment**: Node.js 22.x, TypeScript, ESM modules
- **Styling**: Tailwind CSS v4

### Existing Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── providers.client.tsx    # Client-side providers
│   └── ...
├── components/                 # React components
├── lib/                       # Utility functions
└── tests via Vitest/Playwright
```

### Current Dependencies Relevant to MSW

- Next.js 15.3.5 with React 19.1.0
- Vitest for unit testing with happy-dom
- Playwright for E2E testing
- Storybook for component development

## Integration Strategy

### Phase 1: Core MSW Setup

#### 1.1 Dependencies Installation

```bash
pnpm add -D msw@latest
```

#### 1.2 Core File Structure

```
src/
├── mocks/
│   ├── handlers/
│   │   ├── api.ts              # REST API handlers
│   │   ├── github.ts           # GitHub API handlers (for projects page)
│   │   └── index.ts            # Handler exports
│   ├── browser.ts              # Browser worker setup
│   ├── node.ts                 # Node.js server setup
│   └── index.ts                # Main exports
├── app/
│   ├── msw-provider.tsx        # MSW provider component
│   └── layout.tsx              # Modified to include MSW
```

#### 1.3 Environment-Specific Setup

**Development Environment**

- Enable MSW in development mode only
- Mock external APIs (GitHub API, any future APIs)
- Preserve hot reloading functionality

**Testing Environment**

- Vitest: Server-side mocking for SSR components
- Playwright: Full-stack mocking for E2E tests
- Storybook: Component-level mocking for isolated development

### Phase 2: Handler Implementation

#### 2.1 GitHub API Handlers

Based on current `src/lib/octokit.ts` usage:

```typescript
// src/mocks/handlers/github.ts
import { http, HttpResponse } from 'msw'

export const githubHandlers = [
  // Mock user repositories
  http.get('https://api.github.com/user/repos', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'project-1',
        description: 'Mock project description',
        html_url: 'https://github.com/user/project-1',
        stargazers_count: 42,
        language: 'TypeScript',
      },
      // ... more mock data
    ])
  }),

  // Mock specific repository data
  http.get('https://api.github.com/repos/:owner/:repo', () => {
    return HttpResponse.json({
      // Mock repository details
    })
  }),
]
```

#### 2.2 Blog/Article Handlers

For future dynamic content features:

```typescript
// src/mocks/handlers/api.ts
import { http, HttpResponse } from 'msw'

export const apiHandlers = [
  // Mock article search/filtering
  http.get('/api/articles', () => {
    return HttpResponse.json({
      articles: [
        // Mock article data
      ],
    })
  }),

  // Mock OpenGraph image generation
  http.get('/api/og', () => {
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    })
  }),
]
```

### Phase 3: Environment Integration

#### 3.1 Next.js App Router Integration

**Modified Layout (`src/app/layout.tsx`)**

```typescript
import { MSWProvider } from './msw-provider'
// ... other imports

// Server-side MSW setup
if (process.env.NODE_ENV === 'development' && process.env.NEXT_RUNTIME === 'nodejs') {
  const { server } = require('@/mocks/node')
  server.listen()
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <MSWProvider>
          <ProvidersClient>
            <div className="flex w-full">
              <Layout>{children}</Layout>
            </div>
          </ProvidersClient>
        </MSWProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

**MSW Provider (`src/app/msw-provider.tsx`)**

```typescript
'use client'

import { Suspense, use } from 'react'
import { handlers } from '@/mocks'

const mockingEnabledPromise =
  typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
    ? import('@/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            // Filter out Next.js internal requests
            if (request.url.includes('_next') || request.url.includes('__nextjs')) {
              return
            }
            print.warning()
          },
        })
        worker.use(...handlers)
      })
    : Promise.resolve()

export function MSWProvider({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>
  }

  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({ children }: { children: React.ReactNode }) {
  use(mockingEnabledPromise)
  return <>{children}</>
}
```

#### 3.2 Testing Integration

**Vitest Setup (`setupTests.ts`)**

```typescript
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from '@/mocks/node'

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())
```

**Playwright Setup (`playwright.config.ts` modifications)**

```typescript
// Add MSW setup to global setup
webServer: [
  {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    env: {
      MSW_ENABLED: 'true', // Enable MSW for E2E tests
    },
  },
],
```

#### 3.3 Storybook Integration

**Storybook Configuration**

```typescript
// .storybook/preview.ts
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks'

initialize()

export const loaders = [mswLoader]
export const parameters = {
  msw: {
    handlers,
  },
}
```

### Phase 4: Advanced Features

#### 4.1 Dynamic Handler Management

```typescript
// src/mocks/utils.ts
export function createDynamicHandler(pattern: string, response: unknown) {
  return http.get(pattern, () => HttpResponse.json(response))
}

// Usage in development tools
export const devHandlers = {
  addHandler: (handler: RequestHandler) => worker.use(handler),
  resetHandlers: () => worker.resetHandlers(),
}
```

#### 4.2 Environment-Specific Configurations

```typescript
// src/mocks/config.ts
export const mswConfig = {
  development: {
    enabled: true,
    logLevel: 'verbose',
    handlers: [...allHandlers],
  },
  test: {
    enabled: true,
    logLevel: 'error',
    handlers: [...testHandlers],
  },
  storybook: {
    enabled: true,
    logLevel: 'warn',
    handlers: [...storybookHandlers],
  },
  production: {
    enabled: false,
  },
}
```

#### 4.3 Mock Data Management

```typescript
// src/mocks/data/
├── github.json         # GitHub API mock responses
├── articles.json       # Article mock data
└── fixtures.ts         # TypeScript fixtures
```

### Phase 5: Documentation and Developer Experience

#### 5.1 Development Commands

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev:msw": "MSW_ENABLED=true pnpm dev",
    "test:msw": "MSW_ENABLED=true pnpm test",
    "storybook:msw": "MSW_ENABLED=true pnpm storybook"
  }
}
```

#### 5.2 Documentation Updates

- Update `CLAUDE.md` with MSW commands and testing strategies
- Create MSW usage examples for common scenarios
- Document mock data management practices

## Critical Implementation Considerations

### Project-Specific Requirements

#### Blog/Portfolio Site Needs

- **GitHub API Integration**: Mock repositories for `/projects` page
- **Static Site Generation**: Ensure MSW doesn't interfere with SSG builds
- **MDX Content**: Mock any dynamic content loading for articles
- **OpenGraph Images**: Mock API route `/api/og` for development

#### Existing Codebase Integration Points

1. **GitHub Integration (`src/lib/octokit.ts`)**
   - Mock `PERSONAL_ACCESS_TOKEN` usage
   - Handle rate limiting scenarios
   - Provide realistic repository data

2. **Environment Validation (`src/env.mjs`)**
   - Add MSW-specific environment variables
   - Ensure Zod validation compatibility

3. **Existing Providers (`src/app/providers.client.tsx`)**
   - Coordinate MSW provider with theme providers
   - Maintain provider order and dependencies

### Technical Refinements

#### Bundle Size Optimization

```typescript
// Only import MSW in development builds
const MSWProvider =
  process.env.NODE_ENV === 'development'
    ? require('./msw-provider').MSWProvider
    : ({ children }: { children: React.ReactNode }) => <>{children}</>
```

#### TypeScript Integration

```typescript
// src/types/msw.ts
export interface MockApiResponse<T = unknown> {
  data: T
  status: number
  headers?: Record<string, string>
}

export interface GitHubRepository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
}
```

#### Environment-Specific Handlers

```typescript
// src/mocks/environments.ts
export const developmentHandlers = [...githubHandlers, ...apiHandlers]
export const testHandlers = [...githubHandlers] // Minimal set for tests
export const storybookHandlers = [...apiHandlers] // UI-focused mocks
```

### Performance Considerations

#### Service Worker Optimization

- Lazy load MSW browser worker
- Implement proper cleanup on hot reload
- Handle service worker updates gracefully

#### Build Process Integration

- Exclude MSW from production builds completely
- Optimize webpack configuration for development
- Ensure compatibility with Turbopack

### Security Considerations

#### API Token Management

```typescript
// Never expose real tokens in mocks
const MOCK_GITHUB_TOKEN = 'ghp_mock_token_for_development_only'

// Validate environment separation
if (process.env.NODE_ENV === 'production' && process.env.MSW_ENABLED) {
  throw new Error('MSW should never be enabled in production')
}
```

## Implementation Timeline (Revised)

### Week 1: Foundation & Analysis

- [ ] **Day 1-2**: Install MSW and analyze existing API usage patterns
- [ ] **Day 3-4**: Create basic structure and GitHub API handlers
- [ ] **Day 5-7**: Implement development environment integration with proper fallbacks

### Week 2: Testing & Validation

- [ ] **Day 8-10**: Configure Vitest with MSW and validate existing tests
- [ ] **Day 11-12**: Set up Playwright E2E testing with comprehensive scenarios
- [ ] **Day 13-14**: Integrate with Storybook and validate component isolation

### Week 3: Enhancement & Optimization

- [ ] **Day 15-17**: Implement dynamic handler management and debugging tools
- [ ] **Day 18-19**: Create comprehensive mock data fixtures with realistic data
- [ ] **Day 20-21**: Optimize bundle size and performance impact

### Week 4: Documentation & Production Readiness

- [ ] **Day 22-24**: Complete documentation updates and developer guides
- [ ] **Day 25-26**: Conduct thorough testing across all environments and devices
- [ ] **Day 27-28**: Final optimizations and deployment preparation

## Risk Assessment & Mitigation

### Technical Risks

1. **Bundle Size Impact**: MSW adds ~60KB gzipped
   - Mitigation: Only load in development/test environments
2. **TypeScript Compatibility**: Ensure type safety with MSW handlers
   - Mitigation: Implement strict typing for all handlers
3. **Hot Reload Interference**: MSW might interfere with Next.js hot reloading
   - Mitigation: Proper service worker lifecycle management

### Development Risks

1. **Learning Curve**: Team needs to understand MSW concepts
   - Mitigation: Comprehensive documentation and examples
2. **Mock Drift**: Mock data becoming outdated
   - Mitigation: Regular review and update processes

## Success Metrics

### Technical Metrics

- Zero MSW-related build failures
- <100ms additional startup time in development
- 100% test coverage for critical API paths
- No production bundle impact

### Developer Experience Metrics

- Reduced external API dependency during development
- Faster test execution (no real API calls)
- Improved Storybook component isolation
- Simplified onboarding for new developers

## Validation & Monitoring Strategy

### Pre-Implementation Validation

1. **Baseline Metrics Collection**
   - Current build times (dev/prod)
   - Current test execution times
   - Bundle size analysis
   - Page load performance metrics

2. **Integration Testing Scenarios**
   ```typescript
   // src/tests/msw-integration.test.ts
   describe('MSW Integration', () => {
     it('should not affect production builds', () => {
       expect(process.env.NODE_ENV === 'production').toBeTruthy()
       expect(
         typeof window !== 'undefined' && 'serviceWorker' in navigator,
       ).toBeFalsy()
     })

     it('should properly mock GitHub API in development', async () => {
       // Test GitHub API mocking
     })

     it('should maintain existing functionality', () => {
       // Regression tests for all existing features
     })
   })
   ```

### Post-Implementation Monitoring

1. **Performance Monitoring**
   - Bundle size impact analysis
   - Development server startup time
   - Hot reload performance
   - Test execution time comparison

2. **Functionality Validation**
   - Verify all existing tests continue to pass
   - Validate GitHub API integration works with mocks
   - Ensure Storybook components render correctly
   - Confirm Playwright tests run successfully with MSW

### Quality Gates

- **Zero production bundle impact**: MSW code must not appear in production builds
- **Development performance**: <200ms additional startup time
- **Test reliability**: 100% test pass rate with MSW integration
- **Documentation completeness**: All MSW features documented with examples

## Advanced Configuration Options

### Conditional MSW Loading

```typescript
// src/lib/msw-config.ts
export const shouldEnableMSW = () => {
  if (typeof window === 'undefined') return false // SSR
  if (process.env.NODE_ENV === 'production') return false
  if (process.env.MSW_ENABLED === 'false') return false
  return (
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
  )
}

export const getMSWConfig = () => ({
  enabled: shouldEnableMSW(),
  logLevel: process.env.MSW_LOG_LEVEL || 'warn',
  onUnhandledRequest: process.env.MSW_STRICT_MODE === 'true' ? 'error' : 'warn',
})
```

### Developer Tools Integration

```typescript
// src/mocks/dev-tools.ts
declare global {
  interface Window {
    __MSW_DEV_TOOLS__: {
      worker: SetupWorker
      resetHandlers: () => void
      addHandler: (handler: RequestHandler) => void
      listHandlers: () => RequestHandler[]
    }
  }
}

// Expose MSW controls in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.__MSW_DEV_TOOLS__ = {
    worker,
    resetHandlers: () => worker.resetHandlers(),
    addHandler: (handler) => worker.use(handler),
    listHandlers: () => worker.listHandlers(),
  }
}
```

## Conclusion

This comprehensive MSW integration will provide:

1. **Reliable Development Environment**: Consistent API responses without external dependencies
2. **Robust Testing**: Isolated, fast, and predictable tests
3. **Enhanced Component Development**: Storybook components with realistic data
4. **Improved Developer Experience**: Faster feedback loops and easier debugging
5. **Production Safety**: Zero impact on production builds and performance
6. **Comprehensive Monitoring**: Built-in validation and performance tracking

The phased approach ensures minimal disruption to current workflows while providing immediate value through improved development and testing capabilities. The additional validation and monitoring strategies ensure long-term maintainability and reliability.

### Critical Success Factors

- **Environment Isolation**: Strict separation between development and production
- **Performance Monitoring**: Continuous validation of build and runtime performance
- **Developer Education**: Comprehensive documentation and examples
- **Gradual Rollout**: Phased implementation with rollback capabilities

## Next Steps

1. **Immediate**: Review and approve this integration plan
2. **Week 1**: Begin Phase 1 implementation with baseline metrics collection
3. **Ongoing**: Establish testing and validation procedures with automated monitoring
4. **Continuous**: Create team onboarding documentation and maintain MSW knowledge base

### Implementation Checklist

- [ ] Stakeholder review and approval
- [ ] Baseline performance metrics collection
- [ ] MSW dependency installation and basic setup
- [ ] GitHub API handler implementation
- [ ] Development environment integration
- [ ] Testing framework integration
- [ ] Storybook integration
- [ ] Documentation and training materials
- [ ] Performance validation and optimization
- [ ] Production deployment safety verification

---

_This plan follows the project's existing patterns and integrates seamlessly with the current Next.js 15 + App Router architecture while providing comprehensive safeguards and monitoring capabilities._
