import Link from 'next/link'

import { type ArchiveProject } from '@/lib/projects'

/**
 * Shows Home's short project list after the shared publication filter runs.
 * Home omits the column when this list is empty.
 * @example
 * <SelectedProjects projects={selected} />
 */
export function SelectedProjects({
  projects,
}: {
  projects: readonly ArchiveProject[]
}) {
  if (projects.length === 0) return null

  return (
    <aside aria-labelledby="selected-projects-title" className="min-w-0">
      <h2
        id="selected-projects-title"
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        Selected projects
      </h2>
      <ul className="mt-6 space-y-6">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium wrap-anywhere text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:text-teal-700 dark:text-zinc-200 dark:decoration-zinc-600 dark:hover:text-teal-400"
            >
              {project.name}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.homeDescription ?? project.description}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/projects"
        className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-teal-700 dark:text-teal-400"
      >
        View all projects{' '}
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </Link>
    </aside>
  )
}
