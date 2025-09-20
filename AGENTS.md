# Repository Guidelines

## Project Structure & Module Organization
- `src/app` hosts Next.js routes, layouts, and server components in file-system segments.
- `src/components` contains reusable components grouped by feature (e.g., `Header`, `Spacer`), while `src/lib` and `src/hooks` contain shared utilities and hooks.
- Page content (MDX, images) lives in `src/images`, `public`, and `typography.ts`; keep them aligned when adding visuals.
- Integration helpers and blog tooling live in `scripts/` and `examples/`; end-to-end specs live in `e2e/`, and unit tests sit beside their source as `*.test.ts[x]`.

## Build, Test, and Development Commands
- `pnpm dev` starts the Next.js dev server with Turbopack; use `pnpm dev:network` for LAN testing.
- `pnpm build` creates the production bundle; follow with `pnpm start` to verify the build locally.
- `pnpm lint` and `pnpm lint:fix` enforce ESLint rules, while `pnpm prettier` handles one-off formatting sweeps.
- `pnpm test` runs the Vitest suite; `pnpm test:storybook` exercises Storybook stories, and `pnpm test:watch` supports rapid TDD cycles.
- `pnpm playwright` runs browser e2e checks defined in `e2e/*.spec.ts`; use `pnpm storybook` for manual visual review.

## Coding Style & Naming Conventions
- Prettier (see `prettier.config.js`) manages 2-space indentation, single quotes, and Tailwind class sorting; commit after formatting.
- TypeScript-first code: prefer `PascalCase` component files in `src/components`, `camelCase` utilities in `src/lib`, and route directories in `kebab-case` under `src/app`.
- Favor functional React components with explicit return types; co-locate styles via Tailwind utility classes, avoiding ad-hoc CSS files.
- Keep environment parsing centralized in `src/env.mjs` using Zod schemas before touching `process.env`.

## Testing Guidelines
- Write unit tests with Vitest + Testing Library; mimic examples in `src/components/Header/ThemeToggle.test.tsx` and keep filenames `${name}.test.tsx`.
- Reuse `setupTests.ts` for shared mocks; add MSW handlers under `msw-setup-next.md` guidance when HTTP mocking is required.
- For e2e flows, extend helpers in `e2e/helper.ts` and scope scenarios per route; run `pnpm playwright:headed` when debugging UI states.
- Aim to update or create Storybook stories alongside component changes so `pnpm test:storybook` covers new surfaces.

## Commit & Pull Request Guidelines
- Follow conventional commits (`type(scope): summary`), mirroring history (`chore(deps)`, `feat(app): ...`); reference issue IDs when available.
- Each PR should outline the change, testing performed, and any environment toggles; attach screenshots or recordings for UI-impacting work.
- Keep diffs focused—split unrelated changes—and ensure lint, tests, and type checks pass before requesting review.
- Tag reviewers familiar with the affected area and note any follow-up tasks or post-deploy toggles in the PR description.
