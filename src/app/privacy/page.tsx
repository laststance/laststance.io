import { type Metadata } from 'next'

import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Text } from '@/components/ui/primitives'

const title = 'Privacy Policy'
export const metadata: Metadata = {
  title: title,
  description:
    'What laststance.io and the personal tools published under Laststance.io collect, and what they do with it.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Text as="p" variant="body" color="muted">
      {children}
    </Text>
  )
}

export default function Privacy() {
  return (
    <SimpleLayout
      title="Privacy Policy"
      intro="Laststance.io is run by one person, Ryota Murakami. This page says what this website and my personal tools collect. Last updated: October 10, 2026."
    >
      <div className="space-y-20">
        <Section title="This website">
          <div className="space-y-6">
            <Paragraph>
              laststance.io has no accounts, no sign-in, and no forms. It uses
              Vercel Analytics to count page views without cookies, and Sentry
              to report errors so I can fix them. An error report can include
              your browser version, the page URL, and your IP address.
            </Paragraph>
            <Paragraph>
              I do not sell this data, and I do not use it for advertising.
            </Paragraph>
          </div>
        </Section>

        <Section title="Google account access">
          <div className="space-y-6">
            <Paragraph>
              I run a command-line tool (“gog cli”) that connects to Google APIs
              with OAuth. It is for my own use: I am the only person who signs
              in to it, and it reads and writes Gmail and Google Calendar data
              in my own Google account.
            </Paragraph>
            <Paragraph>
              The tool runs on my own computer, and the access tokens stay on
              that computer. I sometimes have an AI assistant read my own mail
              or calendar through this tool, which sends that content to the
              assistant’s model provider (Anthropic) to answer my request.
              Beyond that, nothing is sent to a Laststance server, sold, or used
              for advertising.
            </Paragraph>
            <Paragraph>
              Its use of information received from Google APIs follows the
              Google API Services User Data Policy, including the Limited Use
              requirements. Access can be revoked at any time from the Google
              Account permissions page.
            </Paragraph>
          </div>
        </Section>

        <Section title="Contact">
          <Paragraph>
            Questions about this policy can go to{' '}
            <a
              className="text-teal-500 hover:underline"
              href="mailto:dojce1048@gmail.com"
            >
              dojce1048@gmail.com
            </a>
            .
          </Paragraph>
        </Section>
      </div>
    </SimpleLayout>
  )
}
