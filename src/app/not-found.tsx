import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Text } from '@/components/ui/primitives'

export default function NotFound() {
  return (
    <Container className="page-start">
      <div className="relative flex flex-col items-start">
        <p className="absolute bottom-full mb-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <Text as="h1" variant="h1">
          Page not found
        </Text>
        <p className="page-intro text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button href="/" variant="secondary" className="page-intro">
          Go back home
        </Button>
      </div>
    </Container>
  )
}
