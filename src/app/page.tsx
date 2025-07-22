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
import { getAllArticles } from '@/lib/articles'

export default async function Home() {
  const articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9 max-h-[936px]">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Go Straightforward Web Application Development.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm{' '}
            <a href="https://ryota-murakami.github.io/" target="_blank">
              Ryota Murakami
            </a>{' '}
            who live in Tokyo. Currently working as a freelance
            React/Node/TypeScript developer. Here is my independent OSS
            organization.
          </p>
          <div className="mt-6 flex gap-6">
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
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          {/* Hide <GithubFeedList /> for Mobile */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <GithubFeedList />
          </div>
        </div>
      </Container>
    </>
  )
}
