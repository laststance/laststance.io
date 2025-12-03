import { BriefcaseIcon } from '@/components/icons/BriefcaseIcon'
import { fetchGithubFeedList } from '@/lib/octokit'

import { FeedItem } from './FeedItem'

export async function GithubFeedList() {
  const githubFeedList = await fetchGithubFeedList()

  return (
    <section
      data-react-component="GithubFeedList"
      className="max-xs:w-[340px] max-sm:w-[360px] w-md-[380px] max-lg:m-auto"
    >
      <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        <BriefcaseIcon className="h-7 w-7 flex-none text-teal-500 dark:text-teal-400" />
        <span>GitHub Activity</span>
      </h2>
      <ol className="space-y-6 flex flex-col max-xs:max-w-[340px] h-[730px] overflow-y-scroll overflow-x-clip px-1">
        {githubFeedList.length > 0 ? (
          githubFeedList.map(
            (feed, i) => feed && <FeedItem key={i} feed={feed} />,
          )
        ) : (
          <li className="text-base text-zinc-600 dark:text-zinc-400 py-8 text-center">
            No GitHub activity available at the moment.
          </li>
        )}
      </ol>
    </section>
  )
}