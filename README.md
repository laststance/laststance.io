[![Build](https://github.com/ryota-murakami/laststance.io/actions/workflows/build.yml/badge.svg)](https://github.com/ryota-murakami/laststance.io/actions/workflows/build.yml)
[![Typecheck](https://github.com/ryota-murakami/laststance.io/actions/workflows/typecheck.yml/badge.svg)](https://github.com/ryota-murakami/laststance.io/actions/workflows/typecheck.yml)
[![Lint](https://github.com/ryota-murakami/laststance.io/actions/workflows/lint.yml/badge.svg)](https://github.com/ryota-murakami/laststance.io/actions/workflows/lint.yml)
[![Chrome E2E Tests](https://github.com/laststance/laststance.io/actions/workflows/playwright-chrome.yml/badge.svg)](https://github.com/laststance/laststance.io/actions/workflows/playwright-chrome.yml)
[![iPad Pro 11 E2E Tests](https://github.com/laststance/laststance.io/actions/workflows/playwright-iPad-Pro-11.yml/badge.svg)](https://github.com/laststance/laststance.io/actions/workflows/playwright-iPad-Pro-11.yml)
[![iPhone 14 E2E Tests](https://github.com/laststance/laststance.io/actions/workflows/playwright-iPhone-14.yml/badge.svg)](https://github.com/laststance/laststance.io/actions/workflows/playwright-iPhone-14.yml)
[![Covered by Argos Visual Testing](https://argos-ci.com/badge.svg)](https://app.argos-ci.com/ryota-murakami/laststance.io/reference)

<h1>Laststance.io </h1>

The [Laststance.io](https://www.laststance.io/) website built using [Tailwind UI](https://tailwindui.com), [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

First, [Node@22.x.x](https://nodejs.org/en) required and install the dependencies with [pnpm](https://pnpm.io/installation):

```bash
pnpm install
```

Next, create a `.env.local` file in the root of your project and set `NEXT_PUBLIC_SITE_URL` to your site's public URL.

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
pnpm dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Local build credentials with 1Password

`pnpm build` and `pnpm analyze` resolve `SENTRY_AUTH_TOKEN` using `op run`.
Keep `.env.sentry.1password` ignored and store only a reference in it:

```dotenv
SENTRY_AUTH_TOKEN="op://vault/item/field"
```

Install 1Password CLI and enable its desktop integration. Remove the plaintext
token from `.env.sentry-build-plugin` after verifying the reference. Explicit
values take precedence; `SENTRY_AUTH_TOKEN="" pnpm build` intentionally disables
source-map uploads. CI and Vercel use their injected environment without requiring
local 1Password access. `pnpm dev` and `pnpm start` do not need the build-only token.

## Creating New Blog Posts

You can easily generate a new blog post template using the built-in script:

```bash
pnpm gen
```

This interactive CLI tool will:

1. Prompt you for a post title
2. Prompt you for a description
3. Generate a new MDX file with the correct frontmatter
4. Create the appropriate directory in `src/app/[locale]/articles/`

The script automatically:

- Uses the current date (JST timezone)
- Creates a URL-friendly folder name based on the title
- Sets up the proper article layout and metadata

## English and Japanese

Visitors whose browser prefers Japanese get the site in Japanese. Everyone else gets English. The URLs are the same for both languages.

- `src/proxy.ts` reads the `Accept-Language` header on every request and rewrites `/about` to `/en/about` or `/ja/about`. The browser URL does not change, and no cookie remembers the choice.
- All UI copy lives in `src/i18n/messages/en.ts`. `src/i18n/messages/ja.ts` has the same keys with Japanese text. Copy under `pages` is read only by Server Components and never reaches the browser. Every other namespace also reaches Client Components.
- Article bodies, article titles, and OG image text stay English.

To add a string:

1. Add the English text to `en.ts`. Write a link as `<link>…</link>` and a line break as `<br></br>`.
2. Add the Japanese text under the same key in `ja.ts`. `pnpm typecheck` fails until the key exists.
3. Read the string with `useTranslations('Namespace')` in a Server or Client Component, or with `await getTranslations('Namespace')` in an async component. Use `t.rich` for a message with tags, and pass `proseTags` from `src/i18n/proseTags.tsx` for `<br></br>`.
4. Run `pnpm test src/i18n`. The tests fail if the Japanese text drops a `{placeholder}` or a tag, or if a message has an ICU syntax error.

## Design Language

The visual system — color tokens, typography scale, spacing grid, motion patterns, and editorial voice — is documented in [DESIGN.md](./DESIGN.md). It surfaces decisions already baked into `src/lib/design-tokens.ts` and the component primitives in `src/components/ui/primitives/`.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
