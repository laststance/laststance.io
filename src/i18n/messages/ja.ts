import type { CatalogShape } from './en'

/**
 * Japanese catalog, translated key by key from `en.ts`.
 *
 * Prose uses です・ます調 and labels are short phrases. Product names, code and
 * "Ryota Murakami" stay verbatim, with a half-width space between Japanese and
 * Latin words. Rich tags may move within a sentence but never disappear.
 */
const ja = {
  Metadata: {
    description: 'コーディングプロジェクトに取り組む独立系 OSS 組織です。',
  },

  NotFound: {
    code: '404',
    title: 'ページが見つかりません',
    description: 'お探しのページは見つかりませんでした。',
    backHome: 'ホームに戻る',
  },
} satisfies CatalogShape

export default ja
