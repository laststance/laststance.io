/**
 * Removes trailing slashes so a base URL can be safely concatenated with a
 * leading-slash path.
 *
 * Exists because `NEXT_PUBLIC_SITE_URL` is configured with a trailing slash in
 * production, which turned `${base}/articles/x` into `${base}//articles/x` in
 * the sitemap and RSS feed. Crawlers treat the doubled slash as a separate URL.
 * @param url - Absolute or relative URL, with or without trailing slashes.
 * @returns The same URL with every trailing slash removed.
 * @example
 *   stripTrailingSlash('https://laststance.io/') // => 'https://laststance.io'
 *   stripTrailingSlash('https://laststance.io') // => 'https://laststance.io'
 */
export function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '')
}
