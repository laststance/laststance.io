import { BriefcaseIcon } from '@/components/icons/BriefcaseIcon'
import { fetchGithubFeedList } from '@/lib/octokit'

import { FeedItem } from './FeedItem'

export async function GithubFeedList() {
  const githubFeedList = await fetchGithubFeedList()

  return (
    <div className="max-xs-w-[340px] max-sm:w-[360px] w-md-[380px] max-lg:m-auto rounded-2xl border border-zinc-100 lg:p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Github Feed</span>
      </h2>
      <ol className="mt-2 space-y-4 flex flex-col max-xs:max-w-[340px] h-[730px] overflow-y-scroll overflow-x-clip">
        {githubFeedList.length > 0 ? (
          githubFeedList.map(
            (feed, i) => feed && <FeedItem key={i} feed={feed} />,
          )
        ) : (
          <li className="text-sm text-zinc-500 dark:text-zinc-400 p-4">
            No GitHub activity available at the moment.
          </li>
        )}
      </ol>
    </div>
  )
}
