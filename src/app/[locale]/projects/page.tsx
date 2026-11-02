import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'

import { ArchiveProjectListItem } from '@/components/ArchiveProjectListItem'
import { FeaturedProjectListItem } from '@/components/FeaturedProjectListItem'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Box, Text } from '@/components/ui/primitives'
import { getPageMetadata } from '@/i18n/pageMetadata'
import { getPublishedProjects } from '@/lib/projects'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('projects')
}

export default function Projects() {
  const { featured, stable } = getPublishedProjects()
  const t = useTranslations('pages.projects')

  return (
    <SimpleLayout title={t('meta.title')} intro={t('intro')}>
      {featured.length > 0 && (
        <section
          aria-label={t('featuredLabel')}
          className="border-t border-zinc-200 dark:border-zinc-800"
        >
          {featured.map((project) => (
            <FeaturedProjectListItem key={project.name} {...project} />
          ))}
        </section>
      )}
      {stable.length > 0 && (
        <section aria-label={t('stableLabel')} className="section-start">
          <h2 className="mb-6 text-lg font-semibold">{t('stableHeading')}</h2>
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
          {t.rich('iconsBy', {
            link: (chunks) => (
              <a
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {chunks}
              </a>
            ),
          })}
        </Text>
      </Box>
    </SimpleLayout>
  )
}
