import React from 'react'

import type { ValidatedFeed } from '@/lib/octokit'

import { sanitizeHtml } from '../../lib/sanitizeHtml'

interface Props {
  feed: ValidatedFeed
}

export const FeedItem: React.FC<Props> = ({ feed }) => (
  <li className="FeedItem_container max-xs:max-w-[340px] group transition-all duration-200">
    <dd className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 
                   bg-linear-to-br from-zinc-50 to-white dark:from-zinc-800/50 dark:to-zinc-900/30 
                   rounded-xl p-5 
                   hover:shadow-lg hover:shadow-teal-500/10 dark:hover:shadow-teal-400/5

                   border border-transparent hover:border-teal-500/20 dark:hover:border-teal-400/20
                   backdrop-blur-sm">
      <div
        className="feed-content"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(feed.content['#text']),
        }}
      />
    </dd>
  </li>
)