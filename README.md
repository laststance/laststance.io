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

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` and variable to your site's public URL.  
And set the `PERSONAL_ACCESS_TOKEN` and [github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) created by your Github account.

```
NEXT_PUBLIC_SITE_URL=https://example.com
PERSONAL_ACCESS_TOKEN=ghp_i{|i$AY%kt&)>p$Y@7:C[KC$anpxfJ
```

Next, run the development server:

```bash
pnpm dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Creating New Blog Posts

You can easily generate a new blog post template using the built-in script:

```bash
pnpm gen
```

This interactive CLI tool will:

1. Prompt you for a post title
2. Prompt you for a description
3. Generate a new MDX file with the correct frontmatter
4. Create the appropriate directory in `src/app/articles/`

The script automatically:

- Uses the current date (JST timezone)
- Creates a URL-friendly folder name based on the title
- Sets up the proper article layout and metadata

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
