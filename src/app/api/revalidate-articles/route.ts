import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

import { env } from '@/env.mjs'

/**
 * One-shot revalidation endpoint for flushing the `all-articles` cache tag.
 * Used to recover from a poisoned `unstable_cache` entry in Vercel's Data
 * Cache (e.g., after a serverless runtime cached an empty article list).
 *
 * Guarded by `REVALIDATE_SECRET` env var. Returns 401 if the secret is not
 * configured or the provided token does not match.
 *
 * @example
 * // After deploy, run once:
 * curl -X POST "https://laststance.io/api/revalidate-articles?secret=$REVALIDATE_SECRET"
 * // => { "revalidated": true, "tag": "all-articles", "now": 1776239999999 }
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('all-articles', 'max')

  return NextResponse.json({
    revalidated: true,
    tag: 'all-articles',
    now: Date.now(),
  })
}
