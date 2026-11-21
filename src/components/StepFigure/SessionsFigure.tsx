'use client'

import { useTranslations } from 'next-intl'

import { CodeBlock, FlowBox, type CodePart, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

interface SessionsScene {
  scratchExists: boolean
  scratchActive: boolean
  defaultActive: boolean
  /** The command typed in this step. */
  command?: CodePart[]
  /** Panes inside the scratch server. */
  pane?: boolean
  /** Rows of `herdr session list` shown in this step. */
  list?: string[]
}

const SCENES: SessionsScene[] = [
  {
    scratchExists: false,
    scratchActive: false,
    defaultActive: true,
    list: ['default      running'],
  },
  {
    scratchExists: true,
    scratchActive: true,
    defaultActive: false,
    command: [
      { t: 'herdr ' },
      { t: '--session blog-herdr-demo', hl: true },
      { t: ' server' },
    ],
  },
  {
    scratchExists: true,
    scratchActive: true,
    defaultActive: false,
    command: [
      { t: 'herdr ' },
      { t: '--session blog-herdr-demo', hl: true },
      { t: ' status server' },
    ],
  },
  {
    scratchExists: true,
    scratchActive: true,
    defaultActive: false,
    pane: true,
    command: [
      {
        t: 'herdr --session blog-herdr-demo workspace create --cwd /tmp --no-focus',
      },
    ],
  },
  {
    scratchExists: true,
    scratchActive: true,
    defaultActive: false,
    pane: true,
    command: [
      { t: 'herdr --session blog-herdr-demo pane send-text w1:p1 "…"' },
    ],
  },
  {
    scratchExists: false,
    scratchActive: false,
    defaultActive: true,
    command: [
      {
        t: 'herdr session stop blog-herdr-demo\nherdr session delete blog-herdr-demo',
      },
    ],
    list: ['default      running'],
  },
]

/**
 * Figure 8: a named session is a second, independent server. Commands that
 * carry `--session NAME` reach that server's socket only, so experiments
 * never touch the default session; stop and delete remove it again.
 *
 * @param props - Heading and six captions from the article edition.
 * @example
 * <SessionsFigure title="…" captions={sixSentences} />
 */
export function SessionsFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step) => {
        const s = SCENES[step]
        return (
          <div className="mx-auto grid max-w-xl gap-2">
            {s.command ? (
              <CodeBlock label="shell" parts={s.command} />
            ) : (
              <CodeBlock label="shell" parts={[{ t: '$' }]} dim />
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <FlowBox
                title={`${t('serverLabel')} · ${t('defaultSession')}`}
                active={s.defaultActive}
              >
                <p className="font-mono text-[0.72rem] break-all text-zinc-600 dark:text-zinc-300">
                  ~/.config/herdr/herdr.sock
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {t('realWork')}
                </p>
              </FlowBox>
              <FlowBox
                title={`${t('serverLabel')} · ${t('scratchSession')}`}
                active={s.scratchActive}
                dim={!s.scratchExists}
                badge={s.scratchExists ? t('scratch') : undefined}
              >
                <p className="font-mono text-[0.72rem] break-all text-zinc-600 dark:text-zinc-300">
                  {s.scratchExists
                    ? '~/.config/herdr/sessions/blog-herdr-demo/herdr.sock'
                    : '—'}
                </p>
                <p className="mt-1 font-mono text-xs text-zinc-700 dark:text-zinc-200">
                  {s.pane ? 'w1:p1  $ cat' : ' '}
                </p>
              </FlowBox>
            </div>
          </div>
        )
      }}
    />
  )
}
