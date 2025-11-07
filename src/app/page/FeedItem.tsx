import React from 'react'

import type { ValidatedFeed } from '@/lib/octokit'

import { sanitizeHtml } from '../../lib/sanitizeHtml'

interface Props {
  feed: ValidatedFeed
}

export const FeedItem: React.FC<Props> = ({ feed }) => (
  <li className="FeedItem_container max-xs:max-w-[340px]">
    <dd className="text-sm text-zinc-500 dark:text-zinc-400 dark:bg-zinc-800/90">
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(feed.content[0]._),
        }}
      />
    </dd>
  </li>
)
