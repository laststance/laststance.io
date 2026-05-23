# laststance.io Design Language

> Author-private design archaeology. Already-existing tokens and patterns, surfaced and named so future-me doesn't re-derive them every polish session.
>
> **Source of truth**: code, not this document. When code and DESIGN.md disagree, code wins and DESIGN.md gets updated in the same PR.
>
> **Audience**: private-author-first, public-readable. No insider jargon, but first-person and declarative throughout.

---

## 1. Principles

Four invariants. New visual elements must justify themselves against all four before shipping.

- **Surgical restraint** — Every visual element earns its place by removing ambiguity, not by adding decoration. If you can't articulate what a colored badge proves, the badge doesn't ship.
- **Micro-motion** — Motion exists only to clarify state changes (entrance, expand, focus). Decorative loops, parallax, and "delight" animations are out of scope by design.
- **Editorial voice** — All copy is author-written. Numbers (stars, commits, downloads) are author-curated when shown, never auto-fetched as marketing signal.
- **Foundation over flair** — Typography and spacing carry the page. Color and shadow are quiet support, never the protagonist.

### Exception clause — adding a new visual element

A new visual element (badge, ribbon, decoration, divider style, color variant) requires written answers to:

1. What state or distinction does this make visible?
2. Why can't existing primitives (`Text variant`, `Box border`, spacing) carry the same meaning?
3. Where is this captured in DESIGN.md so future-me knows it exists?

If any answer is hand-wavy, do not ship.

---

## 2. Color Tokens

shadcn/ui HSL tokens with light + dark mappings.

**Source of truth**: `src/styles/global.css` (CSS custom properties) + `src/lib/design-tokens.ts` (`colors` export).

### Semantic tokens (HSL via CSS custom properties)

| Token                | Light (`:root`)  | Dark (`.dark`)   | Usage                 |
| -------------------- | ---------------- | ---------------- | --------------------- |
| `--background`       | `0 0% 100%`      | `240 10% 3.9%`   | Page background       |
| `--foreground`       | `240 10% 3.9%`   | `0 0% 98%`       | Primary text          |
| `--card`             | `0 0% 100%`      | `240 10% 3.9%`   | Elevated surface      |
| `--muted`            | `240 4.8% 95.9%` | `240 3.7% 15.9%` | Muted background      |
| `--muted-foreground` | `240 3.8% 46.1%` | `240 5% 64.9%`   | Secondary text        |
| `--border`           | `240 5.9% 90%`   | `240 3.7% 15.9%` | Divider / border      |
| `--destructive`      | `0 84.2% 60.2%`  | `0 62.8% 30.6%`  | Error state           |
| `--radius`           | `0.5rem`         | (same)           | Default border radius |

### Accent palette — teal

The single accent color across the site. Other hues (yellow, green, red) appear only for semantic states.

| Use                                  | Light                          | Dark          | Tailwind                           |
| ------------------------------------ | ------------------------------ | ------------- | ---------------------------------- |
| Accent text (links, "Active" status) | `teal-700`                     | `teal-400`    | `text-teal-700 dark:text-teal-400` |
| Accent base (link default)           | `teal-500` = `rgb(20,184,166)` | `teal-400`    | `text-teal-500`                    |
| Link hover                           | `teal-600` = `rgb(13,148,136)` | `teal-400`    | `hover:text-teal-600`              |
| Focus ring                           | `teal-500/50`                  | `teal-400/50` | `focus-visible:ring-teal-500/50`   |
| Hover border (subtle)                | `teal-500/40`                  | `teal-400/40` | `hover:border-teal-500/40`         |

### Text color variants (`Text` primitive)

Source: `src/components/ui/primitives/Text.tsx`. WCAG AA+ verified for `default / muted / accent / inverse / error`.

| `color` prop | Light class       | Dark class        | Notes                                                                           |
| ------------ | ----------------- | ----------------- | ------------------------------------------------------------------------------- |
| `default`    | `text-zinc-900`   | `text-zinc-50`    | Default body                                                                    |
| `muted`      | `text-zinc-600`   | `text-zinc-300`   | Secondary                                                                       |
| `accent`     | `text-teal-700`   | `text-teal-400`   | Use sparingly — one focal point per view                                        |
| `inverse`    | `text-zinc-50`    | `text-zinc-900`   | On inverted surface                                                             |
| `success`    | `text-green-600`  | `text-green-400`  | ⚠️ light-mode contrast 3.21:1 on white (sub-AA). Use on shaded background only. |
| `warning`    | `text-yellow-600` | `text-yellow-400` | ⚠️ light-mode contrast 2.93:1 on white (sub-AA). Use on shaded background only. |
| `error`      | `text-red-600`    | `text-red-400`    |                                                                                 |

> **Known follow-up**: `success` / `warning` baseline contrast violations are flagged by Storybook a11y tests today. Address in a separate token-tune PR — out of scope for the DESIGN.md introduction PR.

**Visual reference**: `pnpm storybook` → _Design System / Tokens / ColorTokens_ + _ContrastCheck_.

---

## 3. Typography Scale

Responsive 3-step progression (mobile → tablet → desktop).

**Source of truth**: `src/lib/design-tokens.ts` (`typography` export) + `src/components/ui/primitives/Text.tsx` (`textVariants`) + `typography.js` (Tailwind Typography overrides for MDX article prose).

| Variant     | Mobile | Tablet (`sm:`) | Desktop (`lg:`) | Weight                            | Default element |
| ----------- | ------ | -------------- | --------------- | --------------------------------- | --------------- |
| `display`   | 36px   | 48px           | 60px            | 800                               | `<h1>`          |
| `h1`        | 30px   | 36px           | 48px            | 700                               | `<h1>`          |
| `h2`        | 24px   | 30px           | 36px            | 600                               | `<h2>`          |
| `h3`        | 20px   | 24px           | 28px            | 600                               | `<h3>`          |
| `h4`        | 18px   | 20px           | 24px            | 600                               | `<h4>`          |
| `bodyLarge` | 18px   | 20px           | 22px            | 400                               | `<p>`           |
| `body`      | 16px   | 18px           | 20px            | 400                               | `<p>`           |
| `bodySmall` | 14px   | 16px           | 18px            | 400                               | `<p>`           |
| `caption`   | 14px   | 14px           | 16px            | 500 (`tracking-wide`)             | `<span>`        |
| `overline`  | 12px   | 12px           | 14px            | 600, uppercase, `tracking-widest` | `<span>`        |
| `code`      | 14px   | 16px           | 18px            | 400, monospace, line-height 1.45  | `<code>`        |

### Usage rules

- **One `display` or `h1` per page**, never both.
- **Body baseline is 20px desktop / 16px mobile** — Apple.com-style readability, ~50–60 chars/line at desktop body width.
- **`caption` ≠ `bodySmall`** — `caption` carries meta (timestamp, category label). `bodySmall` carries secondary content prose.
- **Numbers as data** (stars, dates, ports): wrap in `<code>` or apply `font-mono` to the digit substring only, never to the surrounding prose. Always include a unit (`★ 1,234`, `120 commits`, `port 3939`).
- **Article prose (MDX rendering)** — flat **20px** body across breakpoints (no responsive ladder; matches the desktop `body` variant). Inline `<code>` inside `h2/h3` scales as `0.875em` so chips don't shrink against headings. Tables inherit the body size — only `figcaption` / `li::marker` stay at `sm` (14px).

**Visual reference**: `pnpm storybook` → _Design System / Tokens / TypographyTokens_.

---

## 4. Spacing System

8pt grid with 4pt micro adjustments.

**Source of truth**: `src/lib/design-tokens.ts` (`spacing` + `spacingTokens`) + `src/components/ui/primitives/spacing.ts` (CVA variants).

### Numeric scale (Tailwind-compatible)

| Key   | rem   | px  | Notes           |
| ----- | ----- | --- | --------------- |
| `0`   | 0     | 0   |                 |
| `0.5` | 0.125 | 2   | micro           |
| `1`   | 0.25  | 4   | micro           |
| `1.5` | 0.375 | 6   |                 |
| `2`   | 0.5   | 8   | base unit       |
| `3`   | 0.75  | 12  |                 |
| `4`   | 1     | 16  | normal          |
| `5`   | 1.25  | 20  |                 |
| `6`   | 1.5   | 24  | relaxed         |
| `8`   | 2     | 32  | loose           |
| `10`  | 2.5   | 40  |                 |
| `12`  | 3     | 48  | spacious        |
| `16`  | 4     | 64  | expansive       |
| `20`  | 5     | 80  |                 |
| `24`  | 6     | 96  | extra-expansive |
| `32`  | 8     | 128 | section break   |

### Semantic names (`spacingTokens`)

Use these in design discussion. Use numeric keys in code (Tailwind classes / spacing props).

| Token       | Resolves to          | Use for                         |
| ----------- | -------------------- | ------------------------------- |
| `tight`     | `spacing[2]` = 8px   | Icon ↔ label                    |
| `normal`    | `spacing[4]` = 16px  | Standard sibling gap            |
| `relaxed`   | `spacing[6]` = 24px  | Group internal padding          |
| `loose`     | `spacing[8]` = 32px  | Section break (within a column) |
| `spacious`  | `spacing[12]` = 48px | Hero / feature internal         |
| `expansive` | `spacing[16]` = 64px | Major page section              |

### Breakpoints

**Source of truth**: `tailwind.config.ts` (`theme.screens`) + `src/lib/design-tokens.ts` (`breakpoints`).

| Key   | Min width | Notes                                             |
| ----- | --------- | ------------------------------------------------- |
| `xs`  | 390px     | Custom — smallest iPhone in active use            |
| `sm`  | 640px     | Tailwind default                                  |
| `md`  | 768px     | Tailwind default                                  |
| `lg`  | 1024px    | Tailwind default — 2-column layouts activate here |
| `xl`  | 1280px    | Tailwind default                                  |
| `2xl` | 1536px    | Tailwind default                                  |

**Visual reference**: `pnpm storybook` → _Design System / Tokens / SpacingTokens_ + _SpacingApplications_.

---

## 5. Component Primitives

Three primitives. Everything else composes from these.

**Source of truth**: `src/components/ui/primitives/` (`Box.tsx`, `Stack.tsx`, `Text.tsx`).

### `Box` — polymorphic layout container

Default element: `<div>`.

| Prop                                  | Values                                                             |
| ------------------------------------- | ------------------------------------------------------------------ |
| `p / px / py / m / mx / my / mt / mb` | 8pt scale keys (`0`–`32`)                                          |
| `rounded`                             | `none / sm / md / lg / xl / 2xl / full`                            |
| `bg`                                  | `transparent / primary / secondary / elevated / accent`            |
| `border`                              | `none / default / muted`                                           |
| `shadow`                              | `none / sm / md / lg / xl`                                         |
| `display`                             | `block / inline / inlineBlock / flex / inlineFlex / grid / hidden` |
| `w`                                   | `auto / full / screen / max / min / fit`                           |
| `maxW`                                | `none / xs..7xl / prose / full`                                    |
| `as`                                  | any `ElementType`                                                  |

### `Stack` / `VStack` / `HStack` — flex container with 8pt gap

`Stack` is the base. `VStack` = `direction="vertical"` shorthand. `HStack` = `direction="horizontal"` shorthand.

| Prop        | Values                                             | Default    |
| ----------- | -------------------------------------------------- | ---------- |
| `direction` | `vertical / horizontal`                            | `vertical` |
| `gap`       | 8pt scale keys (`0`–`16`)                          | `4` (16px) |
| `align`     | `start / center / end / stretch / baseline`        | `stretch`  |
| `justify`   | `start / center / end / between / around / evenly` | `start`    |
| `wrap`      | `true / false`                                     | `false`    |
| `fullWidth` | `true / false`                                     | `false`    |

### `Text` — polymorphic typography

Default element derived from `variant` (e.g. `h1` → `<h1>`, `body` → `<p>`, `caption` → `<span>`).

| Prop                                  | Values                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `variant`                             | `display / h1..h4 / bodyLarge / body / bodySmall / caption / overline / code` |
| `color`                               | `default / muted / accent / inherit / inverse / success / warning / error`    |
| `align`                               | `left / center / right / justify`                                             |
| `weight`                              | `normal / medium / semibold / bold`                                           |
| `transform`                           | `uppercase / lowercase / capitalize / none`                                   |
| `italic / truncate`                   | `true / false`                                                                |
| `clamp`                               | `1 / 2 / 3 / 4 / none`                                                        |
| `mt / mb / mx / my / m / p / px / py` | 8pt scale keys                                                                |
| `as`                                  | any `ElementType`                                                             |

### Usage rules

- **No raw `<div>` for spacing** — use `Box` with spacing props, or `Stack` for sibling gaps.
- **No raw heading tags** — use `<Text variant="h1">` so size + weight + tracking stay coupled.
- **`Text` polymorphism over duplicate components** — `<Text as="a" href="...">` is preferred over a separate `Link` for design-system-controlled link text.

**Visual reference**: `pnpm storybook` → _Design System / Migration Patterns_.

---

## 6. Motion Language

All motion uses [`motion/react`](https://motion.dev/) (formerly Framer Motion).

**Source of truth**: `src/components/ProjectListItem.tsx` (canonical pattern).

### Entrance — staggered fade-up

For list items that arrive together (project lists, archive rows).

```tsx
<motion.article
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: index * 0.05,
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1],
  }}
/>
```

- **Delay**: `index * 0.05` seconds. Cap by limiting list length — never let the tail exceed ~0.5s, which becomes perceptibly slow.
- **Curve**: `[0.25, 0.1, 0.25, 1]` (cubic-bezier, "Apple ease-out").
- **Distance**: `y: 20 → 0` (~20px upward translation).

### Spring physics — height and position

For expand/collapse, hover, and focus transitions.

| Behavior                              | Spring config                                     |
| ------------------------------------- | ------------------------------------------------- |
| Height auto (accordion expand)        | `{ type: 'spring', stiffness: 500, damping: 30 }` |
| Position nudge (arrow shift on hover) | `{ type: 'spring', stiffness: 400, damping: 25 }` |
| Opacity fade alongside a spring       | `{ duration: 0.2 }` (tween, not spring)           |

### Hover / focus parity

Hover and focus must trigger the **same** state. Keyboard users see the same expansion as mouse users.

```tsx
onHoverStart={() => setIsExpanded(true)}
onHoverEnd={() => setIsExpanded(false)}
// On the inner Link:
onFocus={() => setIsExpanded(true)}
onBlur={() => setIsExpanded(false)}
```

### Exception: static by design

Entrance motion communicates "new content has arrived." The following are not arrivals and intentionally omit stagger / entrance motion:

- **`NowPanel`** (planned for Phase 2 — `src/app/page/NowPanel.tsx` does not exist yet) — represents stable, ongoing intent. Animating it implies it just changed; it didn't.
- **Hero header** (`src/app/page.tsx` author intro block) — already in view above the fold; animating on every mount is theatrical.
- **Layout primitives** (`Container`, `Box`, `Stack` themselves) — these wrap content; the content animates, not the wrapper.

When omitting motion, leave a single comment in the component so future-me doesn't "fix" it:

```tsx
{
  /* Intentionally static — see DESIGN.md §6 "Exception: static by design" */
}
```

---

## 7. Status Label Vocabulary (Featured Projects only)

Five fixed labels. **The vocabulary does not grow without a DESIGN.md edit.**

| Label        | Meaning                                            |
| ------------ | -------------------------------------------------- |
| `Active`     | Currently improving in pixel-level increments      |
| `Daily tool` | The author personally uses it daily                |
| `Experiment` | Idea probe — completeness is secondary to learning |
| `Maintained` | Feature-frozen, but accepts bug fixes              |
| `Paused`     | Temporarily inactive (not deprecated)              |

These labels are **author-judgment-derived**. Promoting a metric (stars, commits, contributor count) into a label is **forbidden** — that re-introduces the marketing posture the site is built to avoid.

### Visual treatment

- **`Active` only**: `text-teal-700 dark:text-teal-400` (= `Text` primitive `color="accent"`).
- **Other four** (`Daily tool` / `Experiment` / `Maintained` / `Paused`): `text-zinc-400 dark:text-zinc-500`.
- **All labels share**: `font-mono uppercase tracking-wider` (use `Text variant="caption" transform="uppercase"` with a `font-mono` className override).

Rationale: one focal point per view ("what I'm working on right now") gets the accent. The other four labels stay editorially uniform — same type, same color, same weight. Hierarchy without theatrics.

### Type contract

```ts
// Planned location: src/lib/projects.ts (Phase 3 — file does not exist yet)
type FeaturedStatus =
  | 'Active'
  | 'Daily tool'
  | 'Experiment'
  | 'Maintained'
  | 'Paused'
```

The union will live next to the data once `src/lib/projects.ts` lands in Phase 3. Importing the type elsewhere is fine; redefining it is a documentation bug.

---

## 8. Layout Rules

### Page widths

- **Outer shell** — `Container` (`src/components/Container.tsx`) wraps with `max-w-7xl` (1280px) + horizontal padding.
- **Article / prose body** — `max-w-[60rem]` (960px) reading column inside the `max-w-5xl` (1024px) Container at `lg:` (~32px gutters either side, matching tkdodo.eu). Smaller screens collapse to the parent's full width. Prose's internal `max-w` is `none` — width is controlled by the layout wrapper.
- **Hero intro block** — `<Box maxW="2xl">` so the lead paragraph stays at ~50–60 chars/line.

### Home page — 2-column grid

`src/app/page.tsx`:

```tsx
<div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
  <VStack gap={16}>{/* Left: Recent Articles */}</VStack>
  <div className="space-y-10 lg:pl-16 xl:pl-24">
    {/* Right: NowPanel (planned for Phase 2). Currently GithubFeedList. */}
  </div>
</div>
```

- Mobile / tablet: single column, right-column content stacks below the left.
- `lg:` and up: 50/50 columns with extra left-padding on the right column (`lg:pl-16 xl:pl-24`) for visual breathing.

### Projects page (post-Phase 3 refactor)

- **Featured section** (top): no section heading — position is the cue.
- **Divider**: 64px–96px top margin (`mt-24` / `lg:mt-32`) from Featured to the divider line.
- **Archive section**: small `overline` heading "Archive", denser row spacing (`py-4`), `min-h-[44px]` per row for iOS HIG tap-target compliance.

### Vertical rhythm

- Section ↔ section gap: `spacingTokens.expansive` (64px) minimum on desktop, `loose` (32px) on mobile.
- Heading ↔ first paragraph: `mt={6}` (24px).
- Paragraph ↔ paragraph: rely on `leading-relaxed` baked into `Text` variants — do not stack `mt` between paragraphs.

---

## 9. Iconography

**Source of truth**: `src/components/icons/` (local custom SVGs) + Heroicons-style stroke icons where shipping shadcn primitives.

### Inventory (current)

| File                  | Use                                                 |
| --------------------- | --------------------------------------------------- |
| `ArrowDownIcon.tsx`   | Scroll cue                                          |
| `BriefcaseIcon.tsx`   | (To be removed in Phase 2 — was for GithubFeedList) |
| `ChevronDownIcon.tsx` | Disclosure                                          |
| `CloseIcon.tsx`       | Modal close                                         |
| `LinkIcon.tsx`        | External link cue                                   |
| `MailIcon.tsx`        | Contact                                             |
| `MoonIcon.tsx`        | Theme toggle (dark)                                 |
| `SunIcon.tsx`         | Theme toggle (light)                                |

### Adding an icon

1. Prefer extending the local set in `src/components/icons/` over pulling a new package.
2. SVG-as-component, one icon per file. No inline SVG in feature components.
3. Stroke icons: `strokeWidth={2}`, `stroke="currentColor"`, `fill="none"`.
4. Size via Tailwind utility classes (`h-5 w-5`, `h-6 w-6`) on the parent — never `width` / `height` attributes on the SVG itself.
5. `aria-hidden="true"` when adjacent text already describes the icon. Add a `<title>` element only when the icon stands alone as a control.

---

## 10. Voice

How copy is written across UI, prose, and project descriptions.

- **First-person, declarative** — "I built this to…" not "This project was created to…". Passive constructions are out.
- **No marketing vocabulary** — Banned phrases include _leverage_, _synergy_, _disrupt_, _seamless_, _ecosystem_, _empower_, _delight_. If the sentence still works without the word, the word was decoration.
- **Numbers earn their place** — Showing a star count or download count requires asking "what does this prove?". If the answer is "popularity," reconsider. If shown: `font-mono` on the digits only, always include a unit (`★ 1,234`, `120 commits`, `port 3939`).
- **No false certainty** — "Experiment" is honest. "Cutting-edge solution" is not.
- **Author-author dialect** — Mixed Japanese + English is fine for author-only documents (this file, plan files in `~/.gstack/`). UI copy stays in English.
- **Show, don't claim** — Instead of writing "high performance," show a Lighthouse score with the date next to it. Instead of writing "well-tested," link to the Storybook coverage.

---

## Living-document protocol

When code diverges from DESIGN.md:

1. **Code wins.** DESIGN.md is documentation, not enforcement.
2. **Update DESIGN.md in the same PR** as the code change that broke alignment.
3. **A new token / variant / pattern in code is a PR review gate** — the DESIGN.md update must land with it.

Tooling that _does_ enforce these decisions (and should be trusted over the document for runtime checks):

- Tailwind config — `tailwind.config.ts`
- Design tokens — `src/lib/design-tokens.ts`
- Storybook a11y addon — surfaces contrast regressions
- Component primitives — CVA variants prevent ad-hoc Tailwind in feature code
