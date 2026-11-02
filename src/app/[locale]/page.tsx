import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/Container'
import { HomeColumns } from '@/components/HomeColumns'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { Box, HStack, Text, VStack } from '@/components/ui/primitives'
import { getAllArticles } from '@/lib/articles'

import { Article } from './page/Article'
import { Photos } from './page/Photos'
import { SocialLink } from './page/SocialLink'

export default async function Home() {
  const articles = (await getAllArticles()).slice(0, 4)
  const t = await getTranslations('pages.home')
  const common = await getTranslations('Common')

  return (
    <>
      <Container className="mt-9">
        <Box maxW="2xl">
          <VStack gap={6}>
            <Text variant="h1">{t('tagline')}</Text>
            <Text variant="body" color="muted">
              {t.rich('bio', {
                link: (chunks) => (
                  <a
                    href="https://ryota-murakami.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={common('personalSiteLabel')}
                    className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </Text>
            <HStack gap={2}>
              <SocialLink
                href="https://twitter.com/malloc007"
                aria-label={t('followOn.twitter')}
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://www.instagram.com/ryota_murakam1/"
                aria-label={t('followOn.instagram')}
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/ryota-murakami"
                aria-label={t('followOn.github')}
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/ryota-murakami-ba9206164/"
                aria-label={t('followOn.linkedin')}
                icon={LinkedInIcon}
              />
            </HStack>
          </VStack>
        </Box>
      </Container>
      <Photos />
      <Container className="section-start">
        <HomeColumns>
          <VStack gap={12} className="min-w-0">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </VStack>
        </HomeColumns>
      </Container>
    </>
  )
}
