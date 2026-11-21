'use client'

import { useTranslations } from 'next-intl'

import { CellGrid } from './CellGrid'
import { FlowBox, Gap, Travelling, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

type Who = 'program' | 'server' | 'window' | 'script'

interface ArchitectureScene {
  active: Who
  /** Bytes or message travelling between boxes in this step, if any. */
  travelling?: { text: string; direction: 'down' | 'up' }
  serverShowsHi: boolean
  windowShowsHi: boolean
  /** The window is crossed out: the experiments run with no window at all. */
  windowGone: boolean
}

/** Six steps: program → PTY → server grid → window client → no window → script client. */
const SCENES: ArchitectureScene[] = [
  {
    active: 'program',
    serverShowsHi: false,
    windowShowsHi: false,
    windowGone: false,
  },
  {
    active: 'program',
    travelling: { text: 'h i', direction: 'down' },
    serverShowsHi: false,
    windowShowsHi: false,
    windowGone: false,
  },
  {
    active: 'server',
    serverShowsHi: true,
    windowShowsHi: false,
    windowGone: false,
  },
  {
    active: 'window',
    travelling: { text: 'screen', direction: 'down' },
    serverShowsHi: true,
    windowShowsHi: true,
    windowGone: false,
  },
  {
    active: 'server',
    serverShowsHi: true,
    windowShowsHi: false,
    windowGone: true,
  },
  {
    active: 'script',
    travelling: { text: 'socket', direction: 'up' },
    serverShowsHi: true,
    windowShowsHi: false,
    windowGone: true,
  },
]

/**
 * Figure 2: who owns the screen. A program writes into a PTY, the herdr
 * server applies it to its own grid, and windows and scripts are both just
 * clients of that server.
 *
 * @param props - Heading and six captions from the article edition.
 * @example
 * <ArchitectureFigure title="…" captions={sixSentences} />
 */
export function ArchitectureFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => {
        const scene = SCENES[step]
        return (
          <div className="mx-auto max-w-md">
            <FlowBox
              title={`${t('programLabel')}: cat`}
              active={scene.active === 'program'}
            >
              <p className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                stdout → {t('ptyLabel')}
              </p>
            </FlowBox>
            {/* Program traffic flows between the program and the server */}
            {scene.travelling && scene.active === 'program' ? (
              <Travelling {...scene.travelling} reduceMotion={reduceMotion} />
            ) : (
              <Gap />
            )}
            <FlowBox
              title={t('serverLabel')}
              active={scene.active === 'server'}
            >
              <CellGrid
                cols={6}
                rows={2}
                compact
                reduceMotion={reduceMotion}
                lines={scene.serverShowsHi ? ['hi'] : []}
                cursor={
                  scene.serverShowsHi ? { row: 1, col: 3 } : { row: 1, col: 1 }
                }
              />
            </FlowBox>
            {/* Client traffic (window and script) flows between the server and the clients */}
            {scene.travelling && scene.active !== 'program' ? (
              <Travelling {...scene.travelling} reduceMotion={reduceMotion} />
            ) : (
              <Gap />
            )}
            <div className="grid grid-cols-2 gap-2">
              <FlowBox
                title={t('windowLabel')}
                active={scene.active === 'window'}
                dim={scene.windowGone}
                badge={scene.windowGone ? t('noWindow') : undefined}
              >
                <CellGrid
                  cols={6}
                  rows={2}
                  compact
                  reduceMotion={reduceMotion}
                  lines={scene.windowShowsHi ? ['hi'] : []}
                  cursor={scene.windowShowsHi ? { row: 1, col: 3 } : null}
                />
              </FlowBox>
              <FlowBox
                title={t('scriptLabel')}
                active={scene.active === 'script'}
              >
                <p className="font-mono text-xs break-all text-zinc-600 dark:text-zinc-300">
                  herdr pane read …
                </p>
              </FlowBox>
            </div>
          </div>
        )
      }}
    />
  )
}
