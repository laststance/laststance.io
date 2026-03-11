import { BriefcaseIcon } from '@/components/icons/BriefcaseIcon'

/**
 * Loading skeleton for GithubFeedList used as Suspense fallback.
 * Prevents GitHub API failures from blocking article rendering via streaming.
 * @example
 * <Suspense fallback={<GithubFeedListSkeleton />}>
 *   <GithubFeedList />
 * </Suspense>
 */
export function GithubFeedListSkeleton() {
  return (
    <section
      data-react-component="GithubFeedListSkeleton"
      className="max-xs:w-[340px] max-sm:w-[360px] w-md-[380px] max-lg:m-auto"
    >
      <h2 className="flex items-center gap-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
        <BriefcaseIcon className="h-7 w-7 flex-none text-teal-500 dark:text-teal-400" />
        <span>GitHub Activity</span>
      </h2>
      <ol className="space-y-6 flex flex-col max-xs:max-w-[340px] h-[730px] overflow-y-scroll overflow-x-clip px-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="animate-pulse">
            <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-5 space-y-3">
              <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
