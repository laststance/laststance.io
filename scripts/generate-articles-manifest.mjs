#!/usr/bin/env node
/**
 * Generates `src/lib/articles-manifest.ts` from each `src/app/articles/*\/content.mdx`.
 *
 * Why this exists:
 * Previously `src/lib/articles.ts` did a runtime `fast-glob` over the articles
 * folder. On Vercel, the page became dynamically rendered after pagination
 * landed (`searchParams: Promise<…>`), and the serverless function bundle no
 * longer ships the source MDX files, so the glob returned `[]` and the page
 * crashed (`Error: An error occurred in the Server Components render`).
 *
 * This script statically inlines the metadata (slug + frontmatter) into a TS
 * module that webpack bundles into the serverless function. No filesystem
 * access at runtime → no breakage when sources aren't deployed alongside code.
 *
 * Hooked into `prebuild` and `predev` in package.json. Run manually via
 * `pnpm gen:manifest` after adding or editing an article.
 *
 * @example
 *   pnpm gen:manifest
 *   # → src/lib/articles-manifest.ts updated with N entries
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

import glob from 'fast-glob'

const repoRoot = path.resolve(import.meta.dirname, '..')
const articlesDir = path.join(repoRoot, 'src/app/articles')
const outputPath = path.join(repoRoot, 'src/lib/articles-manifest.ts')

/** Frontmatter keys every article object literal is expected to declare. */
const ARTICLE_STRING_FIELD_NAMES = ['author', 'title', 'date', 'description']

/**
 * Reads a quoted string that starts at `source[startIndex]`.
 * Understands `'` / `"` and `\\` escapes so titles like `"I've …"` survive.
 * @param {string} source
 * @param {number} startIndex - Index of the opening quote.
 * @returns {{ value: string, endIndex: number } | null}
 */
function readQuotedString(source, startIndex) {
  const quote = source[startIndex]
  if (quote !== "'" && quote !== '"') {
    return null
  }

  let value = ''
  for (let index = startIndex + 1; index < source.length; index += 1) {
    const character = source[index]
    if (character === '\\') {
      value += source[index + 1] ?? ''
      index += 1
      continue
    }
    if (character === quote) {
      return { value, endIndex: index }
    }
    value += character
  }

  return null
}

/**
 * Pulls one string field out of an object literal without evaluating it.
 * @param {string} objectLiteral - The `{ ... }` block from `export const article`.
 * @param {string} fieldName
 * @returns {string | null}
 */
function extractQuotedStringField(objectLiteral, fieldName) {
  const fieldPrefix = objectLiteral.match(new RegExp(`${fieldName}\\s*:\\s*`))
  if (!fieldPrefix || fieldPrefix.index === undefined) {
    return null
  }

  const quoteStartIndex = fieldPrefix.index + fieldPrefix[0].length
  const quoted = readQuotedString(objectLiteral, quoteStartIndex)
  return quoted?.value ?? null
}

const articleFilenames = await glob('*/content.mdx', { cwd: articlesDir })

// Fail loud at build time if discovery fails — better here than producing an
// empty manifest that ships a broken /articles page to production.
if (articleFilenames.length === 0) {
  throw new Error(
    `generate-articles-manifest: no MDX files found under ${articlesDir}`,
  )
}

/**
 * Extracts the `article = { ... }` object literal from an MDX file's text.
 * @param {string} mdxSource - Full text of a `content.mdx` file.
 * @param {string} filename - Relative path, used only for error messages.
 * @returns {Record<string, unknown>} Parsed metadata as a plain object.
 * @example
 *   extractArticle("export const article = {\n  title: 'X',\n  date: '2026-01-01',\n}")
 *   // => { title: 'X', date: '2026-01-01' }
 */
function extractArticle(mdxSource, filename) {
  // Match `export const article = { ... }` non-greedily up to a closing `}`
  // on its own line. The generator template (`scripts/generate-blog-templete.mjs`)
  // always emits this shape, and every existing article conforms.
  const match = mdxSource.match(
    /export\s+const\s+article\s*=\s*(\{[\s\S]*?\n\})/,
  )
  if (!match) {
    throw new Error(
      `Could not find \`export const article = { ... }\` block in ${filename}`,
    )
  }

  // Parse the four string fields without `new Function` / `eval`. The object
  // literal is first-party, but browser-security/no-eval still flags the
  // constructor, and a field extractor is enough for this shape.
  const objectLiteral = match[1]
  /** @type {Record<string, string>} */
  const article = {}
  for (const fieldName of ARTICLE_STRING_FIELD_NAMES) {
    const fieldValue = extractQuotedStringField(objectLiteral, fieldName)
    if (fieldValue === null) {
      throw new Error(`Missing \`${fieldName}\` in ${filename}`)
    }
    article[fieldName] = fieldValue
  }
  return article
}

const entries = await Promise.all(
  articleFilenames.map(async (filename) => {
    const fullPath = path.join(articlesDir, filename)
    const source = await fs.readFile(fullPath, 'utf8')
    const article = extractArticle(source, filename)
    // Mirror src/lib/articles.ts: drop the `/content.mdx` suffix to derive the slug.
    const slug = filename.replace(/(\/content)?\.mdx$/, '')
    return { slug, ...article }
  }),
)

// Newest first — matches the previous runtime sort so /articles ordering doesn't shift.
entries.sort(
  (a, z) =>
    +new Date(/** @type {string} */ (z.date)) -
    +new Date(/** @type {string} */ (a.date)),
)

const fileContent = `// This file is auto-generated by scripts/generate-articles-manifest.mjs.
// DO NOT EDIT BY HAND — changes are overwritten on the next prebuild/predev.
// Refresh after adding or editing an article: \`pnpm gen:manifest\`.

import type { ArticleWithSlug } from './articles'

export const articlesManifest: ArticleWithSlug[] = ${JSON.stringify(entries, null, 2)}
`

await fs.writeFile(outputPath, fileContent, 'utf8')

console.log(
  `✅ generate-articles-manifest: wrote ${entries.length} articles → ${path.relative(repoRoot, outputPath)}`,
)
