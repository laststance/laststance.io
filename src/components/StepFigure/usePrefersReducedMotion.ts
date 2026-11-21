'use client'

import { useSyncExternalStore } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_MOTION_QUERY)
  media.addEventListener('change', onChange)
  return (): void => media.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Reports the visitor's reduced-motion preference and updates when it changes.
 *
 * Why it exists: Motion's `useReducedMotion` (v14) reads the preference once on
 * mount and never updates. A reader who turns on reduced motion while a figure
 * is playing must see autoplay stop at once. {@link StepPlayer} calls it on every
 * render. The server snapshot is `false`, so the server HTML and the first
 * client render match; React then re-renders with the real preference.
 *
 * @returns
 * - `true` when the visitor asks for reduced motion
 * - `false` when they do not, and during server rendering and hydration
 * @example
 * const reduceMotion = usePrefersReducedMotion() // => false on a default macOS setup
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
