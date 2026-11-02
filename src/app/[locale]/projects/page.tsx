import { type Metadata } from 'next'

import { ArchiveProjectListItem } from '@/components/ArchiveProjectListItem'
import { FeaturedProjectListItem } from '@/components/FeaturedProjectListItem'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Box, Text } from '@/components/ui/primitives'
import { getPublishedProjects } from '@/lib/projects'

const title = 'Projects'

export const metadata: Metadata = {
  title: title,
  description:
    'Laststance.io Projects - Eliminating complexity from web development.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

export default function Projects() {
  const { featured, stable } = getPublishedProjects()

  return (
    <SimpleLayout
      title="Projects"
      intro="Eliminating unnecessary complexity from web development. Tools, libraries, and applications that solve real problems."
    >
      {featured.length > 0 && (
        <section
          aria-label="Featured projects"
          className="border-t border-zinc-200 dark:border-zinc-800"
        >
          {featured.map((project) => (
            <FeaturedProjectListItem key={project.name} {...project} />
          ))}
        </section>
      )}
      {stable.length > 0 && (
        <section aria-label="Stable projects" className="section-start">
          <h2 className="mb-6 text-lg font-semibold">Stable</h2>
          <ul className="border-t border-zinc-200 dark:border-zinc-800">
            {stable.map((project) => (
              <ArchiveProjectListItem key={project.name} {...project} />
            ))}
          </ul>
        </section>
      )}
      <Box className="section-start">
        <Text
          as="p"
          variant="caption"
          className="text-xs text-zinc-500 dark:text-zinc-400"
        >
          Icons by{' '}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Icons8
          </a>
        </Text>
      </Box>
    </SimpleLayout>
  )
}
