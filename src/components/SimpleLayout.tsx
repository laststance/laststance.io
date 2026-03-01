import { Container } from '@/components/Container'
import { Box, Text } from '@/components/ui/primitives'

// TODO Add center layout
export function SimpleLayout({
  title,
  children,
  intro,
}: {
  title: string | React.ReactNode
  children?: React.ReactNode
  intro: string
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <Box as="header" maxW="2xl">
        <Text as="h1" variant="h1">
          {title}
        </Text>
        <Text variant="body" color="muted" mt={6}>
          {intro}
        </Text>
      </Box>
      {children && <Box mt={10}>{children}</Box>}
    </Container>
  )
}
