'use client'

import { useTranslations } from 'next-intl'

import { CellGrid, type CellGridProps } from './CellGrid'
import { FlowBox, Gap, Travelling, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

type Who = 'script' | 'server' | 'program' | 'observer'

type Grid = Pick<CellGridProps, 'lines' | 'cursor'>

/** `StepFigure` message keys for what the program box says, so each edition shows its own language. */
type ProgramNoteKey = 'catWaiting' | 'ptyReceives' | 'ptyEchoes' | 'catPrints'

interface TypingScene {
  active: Who
  scriptCommand: string
  /** Message between the script and the server. */
  top?: string
  /** Message from the server toward the program (left) or the observer (right). */
  bottom?: { side: 'program' | 'observer'; text: string }
  server: Grid
  observer: Grid
  programNote: ProgramNoteKey
}

const EMPTY: Grid = { lines: [], cursor: { row: 1, col: 1 } }
const HI: Grid = { lines: ['hi'], cursor: { row: 1, col: 3 } }
const HI_HI: Grid = { lines: ['hi', 'hi'], cursor: { row: 3, col: 1 } }

const TEXT_CMD = 'herdr pane send-text w1:p1 "hi"'
const KEY_CMD = 'herdr pane send-keys w1:p1 enter'

const SCENES: TypingScene[] = [
  {
    active: 'script',
    scriptCommand: TEXT_CMD,
    server: EMPTY,
    observer: EMPTY,
    programNote: 'catWaiting',
  },
  {
    active: 'server',
    scriptCommand: TEXT_CMD,
    top: '"method":"pane.send_text" ⏎',
    server: EMPTY,
    observer: EMPTY,
    programNote: 'catWaiting',
  },
  {
    active: 'program',
    scriptCommand: TEXT_CMD,
    bottom: { side: 'program', text: 'h i' },
    server: EMPTY,
    observer: EMPTY,
    programNote: 'ptyReceives',
  },
  {
    active: 'server',
    scriptCommand: TEXT_CMD,
    server: HI,
    observer: EMPTY,
    programNote: 'ptyEchoes',
  },
  {
    active: 'observer',
    scriptCommand: TEXT_CMD,
    bottom: { side: 'observer', text: 'ESC[1;1H hi ESC[1;3H' },
    server: HI,
    observer: EMPTY,
    programNote: 'ptyEchoes',
  },
  {
    active: 'observer',
    scriptCommand: TEXT_CMD,
    server: HI,
    observer: HI,
    programNote: 'ptyEchoes',
  },
  {
    active: 'script',
    scriptCommand: KEY_CMD,
    server: HI,
    observer: HI,
    programNote: 'ptyEchoes',
  },
  {
    active: 'program',
    scriptCommand: KEY_CMD,
    server: HI_HI,
    observer: HI,
    programNote: 'catPrints',
  },
  {
    active: 'observer',
    scriptCommand: KEY_CMD,
    bottom: { side: 'observer', text: 'ESC[2;1H hi ESC[3;1H' },
    server: HI_HI,
    observer: HI_HI,
    programNote: 'catPrints',
  },
]

/**
 * Figure 6: a key's round trip. A script asks the server to type, the bytes
 * reach the program in its PTY, the echo changes the server's grid, and a
 * patch brings the new picture to an observer.
 *
 * @param props - Heading and nine captions from the article edition.
 * @example
 * <TypingFigure title="…" captions={nineSentences} />
 */
export function TypingFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => {
        const s = SCENES[step]
        return (
          <div className="mx-auto max-w-md">
            <FlowBox title={t('scriptLabel')} active={s.active === 'script'}>
              <p className="font-mono text-[0.72rem] break-all text-zinc-700 sm:text-xs dark:text-zinc-200">
                $ {s.scriptCommand}
              </p>
            </FlowBox>
            {s.top ? (
              <Travelling
                text={s.top}
                direction="down"
                reduceMotion={reduceMotion}
              />
            ) : (
              <Gap />
            )}
            <FlowBox title={t('serverLabel')} active={s.active === 'server'}>
              <CellGrid
                cols={8}
                rows={3}
                compact
                reduceMotion={reduceMotion}
                {...s.server}
              />
            </FlowBox>
            <div className="grid grid-cols-2 gap-2">
              <div>
                {s.bottom?.side === 'program' ? (
                  <Travelling
                    text={s.bottom.text}
                    direction="down"
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <Gap />
                )}
              </div>
              <div>
                {s.bottom?.side === 'observer' ? (
                  <Travelling
                    text={s.bottom.text}
                    direction="down"
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  <Gap />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <FlowBox
                title={`${t('programLabel')} · ${t('ptyLabel')}`}
                active={s.active === 'program'}
              >
                <p className="font-mono text-[0.72rem] text-zinc-700 sm:text-xs dark:text-zinc-200">
                  {t(s.programNote)}
                </p>
              </FlowBox>
              <FlowBox
                title={t('observerLabel')}
                active={s.active === 'observer'}
              >
                <CellGrid
                  cols={8}
                  rows={3}
                  compact
                  reduceMotion={reduceMotion}
                  {...s.observer}
                />
              </FlowBox>
            </div>
          </div>
        )
      }}
    />
  )
}
