'use client'

import { useTheme } from 'next-themes'
import { useEffect, useId, useRef, useState } from 'react'

import { MermaidLightbox } from '@/components/MermaidLightbox'

interface MermaidProps {
  chart: string
}

/**
 * Renders a Mermaid diagram on the client.
 *
 * Mermaid is loaded via dynamic import so it stays out of the SSR bundle and
 * is only fetched on pages that actually contain a diagram. The component
 * re-renders the SVG whenever the chart text or the resolved theme changes,
 * which keeps it consistent with the site-wide light/dark toggle. Once
 * rendered, the diagram becomes a clickable trigger that opens a fullscreen
 * {@link MermaidLightbox} for pan & zoom inspection.
 *
 * @param chart - Raw Mermaid source (e.g. a `sequenceDiagram` block).
 * @returns
 * - While loading: a `<div>` skeleton with `aria-busy="true"`.
 * - On parse error: a `<pre>` containing the original source.
 * - Once rendered: a `<button>` wrapping the SVG plus a {@link MermaidLightbox}
 *   that opens when the button is activated.
 * @example
 * <Mermaid chart={`sequenceDiagram\n  A->>B: hi`} />
 */
export function Mermaid({ chart }: MermaidProps) {
  // useId() returns values like ":r0:" which are not valid HTML id characters
  // for mermaid's internal SVG elements, so strip non-alphanumerics.
  const rawId = useId()
  const safeId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const { default: mermaid } = await import('mermaid')

        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          securityLevel: 'strict',
          fontFamily: 'inherit',
          flowchart: { htmlLabels: true, curve: 'basis' },
          sequence: { useMaxWidth: true },
        })

        const { svg: rendered } = await mermaid.render(safeId, chart)

        if (!cancelled) {
          setSvg(rendered)
          setHasError(false)
        }
      } catch (error) {
        // Surface the parse error in dev so authors can fix syntax mistakes,
        // but never crash the article page in production.
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Mermaid] failed to render diagram:', error)
        }
        if (!cancelled) {
          setHasError(true)
        }
      }
    }

    void render()

    return () => {
      cancelled = true
    }
  }, [chart, resolvedTheme, safeId])

  if (hasError) {
    return (
      <pre className="not-prose my-6 overflow-auto rounded-2xl bg-zinc-900 p-4 text-sm text-zinc-100 ring-1 ring-zinc-800/50">
        <code>{chart}</code>
      </pre>
    )
  }

  if (!svg) {
    // Avoid layout shift while mermaid loads. The min-height roughly matches
    // a small diagram and shrinks to fit once the SVG is injected.
    return (
      <div
        aria-busy="true"
        className="not-prose my-6 flex min-h-[120px] items-center justify-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/60 dark:bg-zinc-900/40 dark:ring-zinc-800/60"
      >
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading diagram…
        </span>
      </div>
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        aria-label="Open diagram in fullscreen viewer"
        className="not-prose my-6 block w-full cursor-zoom-in rounded-2xl bg-zinc-50 p-4 text-left ring-1 ring-zinc-200/60 transition hover:ring-zinc-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-900/40 dark:ring-zinc-800/60 dark:hover:ring-zinc-700"
      >
        <div
          className="flex justify-center overflow-x-auto [&>svg]:h-auto [&>svg]:max-w-full"
          // Mermaid output is a self-contained SVG string that we control end-to-end.
          // securityLevel: 'strict' above sandboxes user-supplied diagram text.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </button>
      <MermaidLightbox
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
        svg={svg}
        safeId={safeId}
        triggerRef={triggerRef}
      />
    </>
  )
}
