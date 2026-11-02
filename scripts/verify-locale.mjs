#!/usr/bin/env node
/**
 * Checks that a running deployment serves Japanese to Japanese browsers and
 * English to everyone else, without changing URLs.
 *
 * Usage: node scripts/verify-locale.mjs https://laststance.io
 * Exits non-zero when any check fails. Run it against `pnpm start`, a Vercel
 * preview, and production after deploys that touch routing or the proxy.
 */
const baseUrl = (process.argv[2] ?? 'http://localhost:3939').replace(/\/$/, '')

const languages = {
  ja: 'ja-JP,ja;q=0.9,en;q=0.8',
  'en-US': 'en-US,en;q=0.9',
  fr: 'fr-FR,fr;q=0.9',
  none: null,
}
const expectedLang = { ja: 'ja', 'en-US': 'en', fr: 'en', none: 'en' }

const pages = [
  '/',
  '/about',
  '/articles',
  '/articles?page=2',
  '/projects',
  '/uses',
  '/keybinds',
  '/privacy',
  '/articles/Laststance-Recap-November-2025',
  '/articles/update-eslint-config-ts-prefixer@v0.23.3',
]
const missing = '/articles/this-article-does-not-exist'
const untouched = ['/feed.xml', '/sitemap.xml', '/api/og?title=Laststance.io']
const kana = /[぀-ヿ]/
const japaneseDate = /\d{4}年\d{1,2}月\d{1,2}日/

const results = []
const record = (name, ok, detail = '') => results.push({ name, ok, detail })

const get = async (path, acceptLanguage) => {
  const headers = acceptLanguage ? { 'accept-language': acceptLanguage } : {}
  const response = await fetch(`${baseUrl}${path}`, {
    headers,
    redirect: 'manual',
  })
  const body = response.headers.get('content-type')?.includes('text/html')
    ? await response.text()
    : ''
  return { response, body }
}

for (const [label, header] of Object.entries(languages)) {
  for (const path of pages) {
    const { response, body } = await get(path, header)
    const lang = body.match(/<html[^>]*\slang="([^"]+)"/)?.[1]
    const want = expectedLang[label]
    // Header and footer are already Japanese, so only the page's own <main> proves its copy was translated.
    const main = (body.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '')
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]+>/g, ' ')
    const isArticle = /^\/articles\/[^?]+$/.test(path)
    const translated = isArticle ? japaneseDate.test(main) : kana.test(main)
    const ok =
      response.status === 200 &&
      lang === want &&
      (want !== 'ja' || translated) &&
      new URL(response.url).pathname === new URL(`${baseUrl}${path}`).pathname
    record(
      `${label.padEnd(5)} ${path}`,
      ok,
      `status=${response.status} lang=${lang} mainJa=${translated}`,
    )
  }
  const notFound = await get(missing, header)
  record(
    `${label.padEnd(5)} ${missing}`,
    notFound.response.status === 404,
    `status=${notFound.response.status}`,
  )
}

for (const path of untouched) {
  const { response } = await get(path, languages.ja)
  record(`ja    ${path}`, response.status === 200, `status=${response.status}`)
}

// The same URL is cached once per language; alternate languages to catch a cache that ignores Accept-Language.
for (const round of [1, 2]) {
  for (const label of ['ja', 'en-US']) {
    const { body } = await get('/about', languages[label])
    const lang = body.match(/<html[^>]*\slang="([^"]+)"/)?.[1]
    record(
      `alternate #${round} ${label.padEnd(5)} /about`,
      lang === expectedLang[label],
      `lang=${lang}`,
    )
  }
}

const vary = (await get('/about', languages.ja)).response.headers.get('vary')
console.log(`INFO  vary=${vary}`)

for (const { name, ok, detail } of results) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(62)} ${detail}`)
}
const failed = results.filter((result) => !result.ok).length
console.log(`\n${results.length - failed}/${results.length} passed`)
process.exit(failed ? 1 : 0)
