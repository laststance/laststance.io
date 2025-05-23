'use client'

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
    <h3 className="font-bold text-lg">{date}</h3>
    <ul className="mt-4 ml-6 list-disc text-base">
      {li.map((v, i) => (
        <li key={i}>{v}</li>
      ))}
    </ul>
  </div>
)

const WhatNew: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Waht's New?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:min-h-[425px] max-h-[600px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>What's New?</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 space-y-4">
          <List date="2025-05-23" li={['Update Keybinds Style']} />
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
          <List date="2024-08-17" li={['Update Uses page']} />
          <List date="2024-07-28" li={['Update Keybinds']} />
          <List date="2024-07-27" li={['Increase Github Feed record']} />
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
          <List
            date="2024-02-24"
            li={['Keybind: VSCode Open Keybinding.json']}
          />
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
          <List
            date="2023-12-18"
            li={['Keybinds: update selection commands']}
          />
          <List
            date="2023-11-20"
            li={[
              <>
                add article:
                <Link href="https://laststance.io/articles/Trying-less-energy-coding">
                  Trying less energy coding
                </Link>
                '
              </>,
            ]}
          />
          <List
            date="2023-11-05"
            li={[
              'projects: fix prettier-husky-lint-staged-installer broken link',
            ]}
          />
          <List
            date="2023-10-29"
            li={[
              <>
                add post{` `}
                <Link href="articles/dropped-eslint-plugin-sort-keys-custom-order-from-eslint-config-ts-prefixerv1120">
                  Dropped eslint-plugin-sort-keys-custom-order from
                  eslint-config-ts-prefixer@v1.12.0
                </Link>
              </>,
            ]}
          />
          <List
            date="2023-10-25"
            li={[
              'Update "Go to symbol" keybind to "CMD + Shift + O"',
              'Remove incorrect keybinds',
            ]}
          />
          <List
            date="2023-10-24"
            li={['Fix broken blog post body style.', 'Add og image']}
          />
          <List
            date="2023-10-17"
            li={['Add Laststance.io and Dotfiles in Projects.']}
          />
          <List date="2023-10-16" li={['Fix Keybinds page typography.']} />
          <List
            date="2023-10-07"
            li={[
              "Add What's New?",
              'Change shacdn "baseColor": "zinc"',
              'Fix GithubFeed Style',
              'Add 8icon Credit at Projects page',
            ]}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default WhatNew
