'use client'

import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import React from 'react'

import Link from '../Link'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

interface Props {
  date: DateString
  li: ReactNode[]
}
const List: React.FC<Props> = ({ date, li }) => (
  <div className="mt-4">
    <Separator className="mb-4" />
    <h3 className="text-lg font-bold">{date}</h3>
    <ul className="mt-4 ml-6 list-disc text-base">
      {li.map((v, i) => (
        <li
          key={i}
          className="min-h-11 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:py-2"
        >
          {v}
        </li>
      ))}
    </ul>
  </div>
)

const WhatNew: React.FC = () => {
  const t = useTranslations('WhatsNew')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          aria-label={t('openLabel')}
          className="h-11 whitespace-nowrap"
        >
          {t('trigger')}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-150 overflow-y-scroll sm:min-h-106.25 sm:max-w-106.25"
        aria-describedby="whats-new-description"
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <p id="whats-new-description" className="sr-only">
            {t('description')}
          </p>
        </DialogHeader>
        <ScrollArea className="mt-4 space-y-4" aria-label={t('listLabel')}>
          <List
            date="2026-02-14"
            li={[
              <DialogClose asChild key="discontinuing-complete">
                <Link href="/articles/Discontinuing-Complete-macOS-Autocomplete">
                  Discontinuing Complete: Per-App Coordinate Calculation
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2026-01-06"
            li={[
              <DialogClose asChild key="laststance-recap-december-2025">
                <Link href="/articles/laststance-recap-december-2025">
                  Laststance Recap: December 2025
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-12-31"
            li={[
              <DialogClose asChild key="projects-redesign">
                <Link href="/projects">{t('items.addNewProjects')}</Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-12-17"
            li={[
              <DialogClose asChild key="projects-redesign">
                <Link href="/projects">{t('items.projectsRedesign')}</Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-12-05"
            li={[
              <DialogClose asChild>
                <Link href="/articles/Laststance-Recap-November-2025">
                  Laststance Recap: November 2025
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-12-03"
            li={[
              <DialogClose asChild>
                <Link href="/uses">{t('items.updatedMacBookPro')}</Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-11-15"
            li={[
              <DialogClose asChild>
                <Link href="/articles/Cursor-built-in-browser-tool-list">
                  Cursor built-in browser tool list
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-11-14"
            li={[
              <DialogClose asChild>
                <Link href="/articles/Understanding-CSS-fr-by-Reading-the-Original-Spec">
                  Understanding CSS fr by Reading the Original Spec
                </Link>
              </DialogClose>,
            ]}
          />
          <List date="2025-11-13" li={[t('items.updateProjectsPage')]} />
          <List
            date="2025-11-05"
            li={[
              <DialogClose asChild>
                <Link href="/articles/-eslint-config-ts-prefixer-v410-Released">
                  🎉 eslint-config-ts-prefixer v4.1.0 released!
                </Link>
              </DialogClose>,
            ]}
          />
          <List date="2025-10-07" li={[t('items.keybindsChromeRaindropIde')]} />
          <List
            date="2025-06-08"
            li={[
              <DialogClose asChild>
                <Link href="/articles/What-is-the-difference-between-position-fixed-and-sticky">
                  Interactive Demo: Position Fixed vs Sticky
                </Link>
              </DialogClose>,
              <DialogClose asChild>
                <Link href="/articles/major-shadcn-ui-registry-libraries">
                  Major Libraries Available in shadcn/ui Registry
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-05-28"
            li={[
              <DialogClose asChild>
                <Link href="/articles/How-to-use-fakerseed">
                  "How to use faker.seed()"
                </Link>
              </DialogClose>,
            ]}
          />
          <List date="2025-05-23" li={[t('items.updateKeybindsStyle')]} />
          <List
            date="2025-05-08"
            li={[
              <DialogClose asChild>
                <Link href="/articles/Ive-just-released-git-gpt-commit-v090">
                  "I've just released git-gpt-commit v0.9.0! 🎉"
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2025-05-01"
            li={[
              <DialogClose asChild>
                <Link href="/articles/I-created-Redux-Front-Page">
                  I created Redux Front Page
                </Link>
              </DialogClose>,
            ]}
          />
          <List date="2024-08-17" li={[t('items.updateUsesPage')]} />
          <List date="2024-07-28" li={[t('items.updateKeybinds')]} />
          <List date="2024-07-27" li={[t('items.increaseGithubFeedRecord')]} />
          <List
            date="2024-05-22"
            li={[
              <DialogClose asChild>
                <Link href="/articles/react-hook-form-examples">
                  react-hook-form-offic-examples
                </Link>
              </DialogClose>,
            ]}
          />
          <List date="2024-02-24" li={[t('items.keybindOpenKeybindingJson')]} />
          <List
            date="2024-01-29"
            li={[
              <DialogClose asChild>
                <Link href="/articles/Wanna-be-indie-hacker-an-ordinary-person">
                  Wanna be indie hacker an ordinary person.
                </Link>
              </DialogClose>,
            ]}
          />
          <List
            date="2024-01-18"
            li={[
              <DialogClose asChild>
                <Link href="/articles/just-2024-list">Just 2024 list</Link>
              </DialogClose>,
            ]}
          />
          <List date="2023-12-18" li={[t('items.keybindsUpdateSelection')]} />
          <List
            date="2023-11-20"
            li={[
              t.rich('items.addArticle', {
                title: 'Trying less energy coding',
                link: (chunks) => (
                  <DialogClose asChild>
                    <Link href="/articles/Trying-less-energy-coding">
                      {chunks}
                    </Link>
                  </DialogClose>
                ),
              }),
            ]}
          />
          <List date="2023-11-05" li={[t('items.fixInstallerLink')]} />
          <List
            date="2023-10-29"
            li={[
              t.rich('items.addPost', {
                title:
                  'Dropped eslint-plugin-sort-keys-custom-order from eslint-config-ts-prefixer@v1.12.0',
                link: (chunks) => (
                  <DialogClose asChild>
                    <Link href="/articles/dropped-eslint-plugin-sort-keys-custom-order-from-eslint-config-ts-prefixerv1120">
                      {chunks}
                    </Link>
                  </DialogClose>
                ),
              }),
            ]}
          />
          <List
            date="2023-10-25"
            li={[
              t('items.updateGoToSymbolKeybind'),
              t('items.removeIncorrectKeybinds'),
            ]}
          />
          <List
            date="2023-10-24"
            li={[t('items.fixBlogPostBodyStyle'), t('items.addOgImage')]}
          />
          <List date="2023-10-17" li={[t('items.addLaststanceAndDotfiles')]} />
          <List date="2023-10-16" li={[t('items.fixKeybindsTypography')]} />
          <List
            date="2023-10-07"
            li={[
              t('items.addWhatsNew'),
              t('items.changeShadcnBaseColor'),
              t('items.fixGithubFeedStyle'),
              t('items.addIcons8Credit'),
            ]}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default WhatNew
