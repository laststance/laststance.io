#!/usr/bin/env node
/**
 * Checks that a running deployment serves Japanese to Japanese browsers and
 * English to everyone else, without changing URLs, and that the header language
 * switch (a prefixed URL such as `/ja/about`) redirects to the unprefixed URL and
 * stores the choice in the NEXT_LOCALE cookie, which then wins over Accept-Language.
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

const get = async (path, acceptLanguage, cookie) => {
  const headers = {
    ...(acceptLanguage && { 'accept-language': acceptLanguage }),
    ...(cookie && { cookie }),
  }
  const response = await fetch(`${baseUrl}${path}`, {
    headers,
    redirect: 'manual',
  })
  const body = response.headers.get('content-type')?.includes('text/html')
    ? await response.text()
    : ''
  return { response, body }
}

const htmlLang = (body) => body.match(/<html[^>]*\slang="([^"]+)"/)?.[1]

const checkPage = async (name, path, want, acceptLanguage, cookie) => {
  const { response, body } = await get(path, acceptLanguage, cookie)
  const lang = htmlLang(body)
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
    `${name} ${path}`,
    ok,
    `status=${response.status} lang=${lang} mainJa=${translated}`,
  )
}

for (const [label, header] of Object.entries(languages)) {
  for (const path of pages) {
    await checkPage(label.padEnd(5), path, expectedLang[label], header)
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

const cookieName = 'NEXT_LOCALE'
const cookieAttributes = ['Path=/', 'Max-Age=31536000', 'SameSite=lax']

const checkSwitch = async (name, path, acceptLanguage, locale, location) => {
  const { response } = await get(path, acceptLanguage)
  const cookie = response.headers.get('set-cookie') ?? ''
  const landed = response.headers.get('location')
  const landedPath = landed && new URL(landed, baseUrl)
  const ok =
    response.status === 307 &&
    `${landedPath?.pathname}${landedPath?.search}` === location &&
    cookie.startsWith(`${cookieName}=${locale};`) &&
    cookieAttributes.every((attribute) => cookie.includes(attribute))
  record(
    `switch ${name}`,
    ok,
    `status=${response.status} location=${landed} set-cookie=${cookie}`,
  )
}

await checkSwitch('ja /about', '/ja/about', languages['en-US'], 'ja', '/about')
await checkSwitch('en /about', '/en/about', languages.ja, 'en', '/about')
await checkSwitch(
  'keeps query',
  '/ja/articles?page=2',
  languages['en-US'],
  'ja',
  '/articles?page=2',
)
await checkSwitch('home', '/ja', languages['en-US'], 'ja', '/')
await checkSwitch(
  'dotted slug',
  '/ja/articles/update-eslint-config-ts-prefixer@v0.23.3',
  languages['en-US'],
  'ja',
  '/articles/update-eslint-config-ts-prefixer@v0.23.3',
)
await checkSwitch(
  'ja /about twice keeps Set-Cookie',
  '/ja/about',
  languages['en-US'],
  'ja',
  '/about',
)

for (const path of pages) {
  await checkPage(
    'cookie ja',
    path,
    'ja',
    languages['en-US'],
    `${cookieName}=ja`,
  )
  await checkPage('cookie en', path, 'en', languages.ja, `${cookieName}=en`)
}
await checkPage('cookie fr', '/about', 'ja', languages.ja, `${cookieName}=fr`)

for (const [label, header] of Object.entries(languages)) {
  const { response } = await get('/about', header)
  const cookie = response.headers.get('set-cookie')
  record(
    `unpinned ${label.padEnd(5)} /about`,
    cookie === null,
    `set-cookie=${cookie}`,
  )
}

const aboutHeaders = (await get('/about', languages.ja)).response.headers
const cacheControl = aboutHeaders.get('cache-control') ?? ''
const browserRevalidatesAfterSwitch =
  /max-age=0|no-cache|no-store/.test(cacheControl) ||
  (!/(^|[\s,])max-age=/.test(cacheControl) &&
    !aboutHeaders.has('expires') &&
    !aboutHeaders.has('last-modified'))
record(
  'browser revalidates /about after a switch',
  browserRevalidatesAfterSwitch,
  `cache-control=${cacheControl}`,
)

const cachePerLanguage = [
  {
    label: 'cookie ja',
    want: 'ja',
    header: languages['en-US'],
    cookie: `${cookieName}=ja`,
  },
  {
    label: 'cookie en',
    want: 'en',
    header: languages.ja,
    cookie: `${cookieName}=en`,
  },
  { label: 'ja', want: 'ja', header: languages.ja },
  { label: 'en-US', want: 'en', header: languages['en-US'] },
]
for (const round of [1, 2]) {
  for (const { label, want, header, cookie } of cachePerLanguage) {
    const { body } = await get('/about', header, cookie)
    const lang = htmlLang(body)
    record(
      `cached per language #${round} ${label.padEnd(9)} /about`,
      lang === want,
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
