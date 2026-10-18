import { Container } from '@/components/Container'
import { Box, Text } from '@/components/ui/primitives'

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
    <Container className="page-start">
      <Box as="header" maxW="2xl">
        {/* text-balance: let the browser even out line widths on long, wrapping titles */}
        <Text as="h1" variant="h1" className="text-balance wrap-anywhere">
          {title}
        </Text>
        <Text variant="body" color="muted" className="page-intro">
          {intro}
        </Text>
      </Box>
      {children && (
        <Box className="page-content content-column">{children}</Box>
      )}
    </Container>
  )
}
