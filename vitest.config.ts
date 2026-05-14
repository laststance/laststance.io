import path from 'node:path'

import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    setupFiles: ['setupTests.ts'],
    // Define projects for workspace configuration (replaces vitest.workspace.ts)
    projects: [
      {
        // Per-project resolve so the `@` alias works inside the workspace —
        // top-level `resolve.alias` does not propagate into project contexts.
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
        test: {
          name: 'unit',
          environment: 'happy-dom',
          globals: true,
          include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
          setupFiles: ['setupTests.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
