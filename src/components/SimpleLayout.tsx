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
    <Container className="mt-16 sm:mt-24">
      <Box as="header" maxW="2xl">
        {/* text-balance: let the browser even out line widths on long, wrapping titles */}
        <Text as="h1" variant="h1" className="text-balance">
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
