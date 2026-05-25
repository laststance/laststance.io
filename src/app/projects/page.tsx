import { type Metadata } from 'next'

import { ArchiveProjectListItem } from '@/components/ArchiveProjectListItem'
import { Container } from '@/components/Container'
import { FeaturedProjectListItem } from '@/components/FeaturedProjectListItem'
import { Box, Text } from '@/components/ui/primitives'
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from '@/lib/projects'

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

/**
 * Projects page — Featured (status-labeled) / Archive (compressed reference) split.
 *
 * Layout intent (DESIGN.md §7 + Walking Skeleton Phase 3):
 * - Featured 7 — large expanded layout, status label drives single-accent hierarchy.
 * - Archive 22 — 1-line compressed list, alphabetical, no motion / no status.
 *
 * The visual jump from large rows → compressed rows is the hierarchy signal,
 * so the Featured section deliberately has no "Featured" heading.
 */
export default function Projects() {
  // Match SimpleLayout's header offset (mt-16 sm:mt-24) so /projects lines up
  // with /uses and /articles — the earlier md:mt-32 left a visibly wider gap here.
  return (
    <Box as="main" mt={16} className="sm:mt-24">
      <Container>
        <Box as="header" maxW="3xl">
          <Text as="h1" variant="h1">
            Projects
          </Text>
          <Text variant="bodyLarge" color="muted" mt={6}>
            Eliminating unnecessary complexity from web development.
            <br className="hidden sm:block" />
            Tools, libraries, and applications that solve real problems.
          </Text>
        </Box>

        {/* Featured section — top, no heading (the typography itself signals importance) */}
        <Box
          as="section"
          mt={16}
          className="sm:mt-20 md:mt-24"
          aria-label="Featured projects"
        >
          <div className="border-t border-zinc-200/60 dark:border-zinc-700/40" />
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectListItem
              key={project.name}
              name={project.name}
              description={project.description}
              category={project.category}
              href={project.href}
              logo={project.logo}
              status={project.status}
              index={index}
            />
          ))}
        </Box>

        {/* Archive section — divider + heading + compressed list */}
        <Box
          as="section"
          mt={16}
          className="sm:mt-20 md:mt-24"
          aria-label="Archive projects"
        >
          <Text
            as="h2"
            variant="overline"
            color="muted"
            mb={6}
            className="text-zinc-500 dark:text-zinc-400"
          >
            Archive
          </Text>
          <ul className="border-t border-zinc-200/60 dark:border-zinc-700/40">
            {ARCHIVE_PROJECTS.map((project) => (
              <ArchiveProjectListItem
                key={project.name}
                name={project.name}
                description={project.description}
                category={project.category}
                href={project.href}
                logo={project.logo}
              />
            ))}
          </ul>
        </Box>

        {/* Icon Credits */}
        <Box as="section" mt={16}>
          <Text
            as="p"
            variant="caption"
            className="text-xs text-zinc-400 dark:text-zinc-500"
          >
            Icons by{' '}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Icons8
            </a>
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
