'use client'

import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react'
import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

interface MermaidLightboxProps {
  open: boolean
  onOpenChange: (next: boolean) => void
  svg: string
  safeId: string
  /**
   * Ref to the trigger button. Used to restore focus after the dialog closes.
   * Radix's automatic focus restoration is unreliable when the dialog is opened
   * via controlled state instead of a {@link DialogTrigger} child, so we
   * restore focus manually inside `onCloseAutoFocus`.
   */
  triggerRef: RefObject<HTMLButtonElement | null>
}

const MIN_SCALE = 0.25
const MAX_SCALE = 8
const ZOOM_STEP = 1.25
const WHEEL_STEP = 1.1

/**
 * Renders a Mermaid diagram inside a fullscreen dialog with pan & zoom.
 *
 * The component receives the SVG markup already produced by `mermaid.render()`
 * from the parent {@link Mermaid} component, so it never imports mermaid itself.
 * Mermaid embeds the render id inside both the `<svg id="...">` attribute and
 * the embedded `<style>` selectors, so injecting the same string twice on a
 * page would create duplicate ids. The lightbox copy rewrites the id with a
 * `-lb` suffix before injection.
 *
 * Pan/zoom is implemented in a co-located {@link useZoomPan} hook with no
 * third-party dependencies. It supports cursor-anchored mouse wheel, pointer
 * drag, two-finger pinch, keyboard shortcuts (`+` / `-` / `0`), and the
 * visible toolbar at the top-left of the dialog.
 *
 * @param open - Controlled open state of the dialog.
 * @param onOpenChange - Called when Esc, the overlay, or the X button closes the dialog.
 * @param svg - SVG markup produced by mermaid for this diagram.
 * @param safeId - The id mermaid embedded inside `svg`. Used to rewrite the
 *                 lightbox copy so the page does not contain duplicate ids.
 * @returns A `<Dialog>` containing the zoomable diagram.
 * @example
 * <MermaidLightbox
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   svg={renderedSvgString}
 *   safeId="mermaid-r3a"
 * />
 */
export function MermaidLightbox({
  open,
  onOpenChange,
  svg,
  safeId,
  triggerRef,
}: MermaidLightboxProps) {
  const lightboxSvg = useMemo(
    () => svg.replaceAll(safeId, `${safeId}-lb`),
    [svg, safeId],
  )

  const { scale, x, y, zoomIn, zoomOut, reset, viewportRef, handlers } =
    useZoomPan(open)

  // Reset transform whenever the dialog reopens so the user always lands at
  // a known starting point instead of inheriting state from the previous open.
  useEffect(() => {
    if (open) reset()
  }, [open, reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          // Manual focus restoration: Radix's default targets the original
          // activeElement at FocusScope-mount time, which is unreliable when
          // the dialog is driven by external state rather than DialogTrigger.
          event.preventDefault()
          triggerRef.current?.focus()
        }}
        className="grid h-[90vh] w-[95vw] max-w-none gap-0 overflow-hidden border-zinc-200/60 bg-zinc-50 p-0 dark:border-zinc-800/60 dark:bg-zinc-900"
      >
        <DialogTitle className="sr-only">
          Mermaid diagram (zoomable)
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use the toolbar buttons, mouse wheel, drag, pinch, or the keyboard
          shortcuts plus, minus, and zero to zoom and pan the diagram. Press
          Escape to close.
        </DialogDescription>

        {/* Toolbar — top-left so it does not collide with Radix's built-in
            close button at top-right (see src/components/ui/dialog.tsx). */}
        <div className="absolute left-4 top-4 z-10 flex gap-1 rounded-lg border border-zinc-200/60 bg-white/90 p-1 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/80">
          <ToolbarButton onClick={zoomOut} label="Zoom out (-)">
            <ZoomOut className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={reset} label="Reset zoom (0)">
            <Maximize2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={zoomIn} label="Zoom in (+)">
            <ZoomIn className="h-4 w-4" />
          </ToolbarButton>
        </div>

        {/* Viewport — owns pointer + wheel listeners. Keyboard shortcuts
            (+ / - / 0) are bound to `document` while the dialog is open inside
            useZoomPan, so the viewport itself does not need to be focusable. */}
        <div
          ref={viewportRef}
          className="relative cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
          {...handlers}
        >
          <div
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              transformOrigin: '0 0',
            }}
            className="will-change-transform [&>svg]:block [&>svg]:h-auto [&>svg]:max-w-none"
            // Mermaid output is a self-contained SVG string that we control end-to-end
            // (securityLevel: 'strict' inside Mermaid.tsx sandboxes user-supplied diagram text).
            dangerouslySetInnerHTML={{ __html: lightboxSvg }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  label: string
  children: ReactNode
}

function ToolbarButton({ onClick, label, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {children}
    </button>
  )
}

interface UseZoomPanResult {
  scale: number
  x: number
  y: number
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
  viewportRef: (el: HTMLDivElement | null) => void
  handlers: {
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void
    onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void
    onPointerCancel: (e: ReactPointerEvent<HTMLDivElement>) => void
  }
}

/**
 * Pan & zoom state machine for an HTML element containing arbitrary children.
 *
 * Tracks `scale`, `x`, and `y` and exposes a `viewportRef` callback ref. The
 * ref pattern is intentional: Radix Dialog mounts and unmounts its content via
 * a portal each time the dialog opens/closes, so a `useRef`-based effect would
 * only attach its native wheel listener once and miss every subsequent mount.
 * The callback ref lets the wheel effect re-run on every (re)mount and cleanly
 * tear down the previous listener.
 *
 * Keyboard shortcuts (`+` / `-` / `0`) are bound to `document` only while
 * `enabled` is true, so the viewport element itself does not need to be
 * focusable (which would trigger a jsx-a11y warning on a `<div>` viewport).
 * Radix Dialog focus-traps the page while the lightbox is open, so the global
 * listener is scoped to the user's actual interaction window.
 *
 * @param enabled - When false, the document keyboard listener is removed. Pass
 *                  the dialog's `open` state.
 * @returns
 * - `scale` - current scale, clamped to {@link MIN_SCALE}–{@link MAX_SCALE}
 * - `x`, `y` - translation in CSS pixels (no clamping; the `reset` button is
 *              the escape hatch if a user pans the content off-screen)
 * - `zoomIn` / `zoomOut` - multiply / divide `scale` by {@link ZOOM_STEP}
 * - `reset` - return to scale=1, x=0, y=0
 * - `viewportRef` - callback ref to attach to the interactive element
 * - `handlers` - pointer event handlers to spread onto the element
 * @example
 * function MyZoomable({ open }: { open: boolean }) {
 *   const { scale, x, y, viewportRef, handlers } = useZoomPan(open)
 *   return (
 *     <div ref={viewportRef} {...handlers}>
 *       <div style={{ transform: `translate(${x}px, ${y}px) scale(${scale})` }}>
 *         <SomeContent />
 *       </div>
 *     </div>
 *   )
 * }
 */
function useZoomPan(enabled: boolean): UseZoomPanResult {
  const [scale, setScale] = useState(1)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null)

  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const lastPinchDistRef = useRef<number | null>(null)

  // Mirror state into a ref so the imperative wheel listener (attached once
  // per viewport mount) can read the latest values without re-binding.
  const stateRef = useRef({ scale: 1, x: 0, y: 0 })
  useEffect(() => {
    stateRef.current = { scale, x, y }
  }, [scale, x, y])

  const zoomIn = useCallback(() => {
    setScale((current) => clamp(current * ZOOM_STEP, MIN_SCALE, MAX_SCALE))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((current) => clamp(current / ZOOM_STEP, MIN_SCALE, MAX_SCALE))
  }, [])

  const reset = useCallback(() => {
    setScale(1)
    setX(0)
    setY(0)
    pointersRef.current.clear()
    lastPinchDistRef.current = null
  }, [])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointersRef.current.size === 2) {
        const [a, b] = Array.from(pointersRef.current.values())
        lastPinchDistRef.current = Math.hypot(a.x - b.x, a.y - b.y)
      }
    },
    [],
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const previous = pointersRef.current.get(e.pointerId)
      if (!previous) return

      if (pointersRef.current.size === 1) {
        // Single-pointer drag → pan
        const dx = e.clientX - previous.x
        const dy = e.clientY - previous.y
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        setX((current) => current + dx)
        setY((current) => current + dy)
        return
      }

      if (pointersRef.current.size === 2) {
        // Two-pointer pinch → zoom by distance ratio
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        const [a, b] = Array.from(pointersRef.current.values())
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        const lastDist = lastPinchDistRef.current
        if (lastDist && lastDist > 0) {
          const ratio = dist / lastDist
          setScale((current) => clamp(current * ratio, MIN_SCALE, MAX_SCALE))
        }
        lastPinchDistRef.current = dist
      }
    },
    [],
  )

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId)
    if (pointersRef.current.size < 2) {
      lastPinchDistRef.current = null
    }
  }, [])

  // Attach the wheel listener imperatively. React's synthetic onWheel is
  // registered as passive so calling preventDefault() on it is silently dropped
  // — the only way to truly cancel default page scroll is a native listener
  // with { passive: false }. Re-runs whenever the viewport DOM node changes
  // (e.g. when Radix unmounts and remounts the Dialog content).
  useEffect(() => {
    if (!viewport) return

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const rect = viewport.getBoundingClientRect()
      const cursorX = event.clientX - rect.left
      const cursorY = event.clientY - rect.top
      const factor = event.deltaY < 0 ? WHEEL_STEP : 1 / WHEEL_STEP
      const { scale: currentScale, x: currentX, y: currentY } = stateRef.current
      const nextScale = clamp(currentScale * factor, MIN_SCALE, MAX_SCALE)
      // Anchor the zoom on the cursor: keep the world point under the pointer
      // stationary while the surrounding content scales.
      const nextX = cursorX - (cursorX - currentX) * (nextScale / currentScale)
      const nextY = cursorY - (cursorY - currentY) * (nextScale / currentScale)
      setScale(nextScale)
      setX(nextX)
      setY(nextY)
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      viewport.removeEventListener('wheel', handleWheel)
    }
  }, [viewport])

  // Document-level keyboard shortcuts, gated on `enabled`. Bound to document
  // (not the viewport) so users can press +/-/0 without first clicking into
  // the diagram, and so the viewport <div> does not need a tabIndex (which
  // would violate jsx-a11y/no-noninteractive-tabindex).
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        setScale((current) => clamp(current * ZOOM_STEP, MIN_SCALE, MAX_SCALE))
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        setScale((current) => clamp(current / ZOOM_STEP, MIN_SCALE, MAX_SCALE))
      } else if (event.key === '0') {
        event.preventDefault()
        setScale(1)
        setX(0)
        setY(0)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled])

  return {
    scale,
    x,
    y,
    zoomIn,
    zoomOut,
    reset,
    viewportRef: setViewport,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  }
}

/**
 * Clamps `value` to the inclusive `[min, max]` range.
 *
 * @param value - The number to clamp.
 * @param min - Lower bound (inclusive).
 * @param max - Upper bound (inclusive).
 * @returns The closest number to `value` that is within `[min, max]`.
 * @example
 * clamp(5, 0, 10)  // => 5
 * clamp(-3, 0, 10) // => 0
 * clamp(99, 0, 10) // => 10
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
