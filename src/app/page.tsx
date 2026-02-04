import { Article } from '@/app/page/Article'
import { GithubFeedList } from '@/app/page/githubFeedList'
import { Photos } from '@/app/page/Photos'
import { SocialLink } from '@/app/page/SocialLink'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { Box, HStack, Text, VStack } from '@/components/ui/primitives'
import { getAllArticles } from '@/lib/articles'

/**
 * Enable ISR with 1-hour revalidation interval
 * Matches GitHub feed cache duration for consistent updates
 */
export const revalidate = 3600

export default async function Home() {
  const articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9 max-h-234">
        <Box maxW="2xl">
          <VStack gap={6}>
            <Text variant="h1">
              Go Straightforward Web Application Development.
            </Text>
            <Text variant="body" color="muted">
              I'm{' '}
              <a
                href="https://ryota-murakami.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ryota Murakami's personal website (opens in new tab)"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                Ryota Murakami
              </a>{' '}
              who lives in Tokyo. Currently working as a freelance
              React/Node/TypeScript developer. Here is my independent OSS
              organization.
            </Text>
            <HStack gap={6}>
              <SocialLink
                href="https://twitter.com/malloc007"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://www.instagram.com/ryota_murakam1/"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/ryota-murakami"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/ryota-murakami-ba9206164/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </HStack>
          </VStack>
        </Box>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <VStack gap={16}>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </VStack>
          {/* Hide <GithubFeedList /> for Mobile */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <GithubFeedList />
          </div>
        </div>
      </Container>
    </>
  )
}
