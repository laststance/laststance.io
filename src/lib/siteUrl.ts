import { env } from '@/env.mjs'

import { stripTrailingSlash } from './stripTrailingSlash'

const DEFAULT_SITE_URL = 'https://laststance.io'

/**
 * Canonical origin of the site, guaranteed to carry no trailing slash.
 *
 * Callers append their own leading-slash path (`${SITE_URL}/feed.xml`), so the
 * separator is normalized once here rather than at every call site.
 * @example
 *   `${SITE_URL}/articles/${slug}` // => 'https://laststance.io/articles/my-post'
 */
export const SITE_URL = stripTrailingSlash(
  env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
)
