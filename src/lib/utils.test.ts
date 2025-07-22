import { describe, it, expect } from 'vitest'
import { cn, clamp } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle conditional classes', () => {
      const condition1 = false
      const condition2 = true
      expect(cn('foo', condition1 && 'bar', 'baz')).toBe('foo baz')
      expect(cn('foo', condition2 && 'bar', 'baz')).toBe('foo bar baz')
    })

    it('should merge tailwind classes correctly', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
      expect(cn('p-4', 'px-2')).toBe('p-4 px-2')
    })

    it('should handle arrays of classes', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('should handle objects with boolean values', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should handle undefined and null values', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
      expect(cn('')).toBe('')
    })
  })

  describe('clamp', () => {
    it('should clamp number within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(15, 0, 10)).toBe(10)
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('should handle reversed range', () => {
      expect(clamp(5, 10, 0)).toBe(5)
      expect(clamp(15, 10, 0)).toBe(10)
      expect(clamp(-5, 10, 0)).toBe(0)
    })

    it('should handle equal bounds', () => {
      expect(clamp(5, 5, 5)).toBe(5)
      expect(clamp(0, 5, 5)).toBe(5)
      expect(clamp(10, 5, 5)).toBe(5)
    })

    it('should handle negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)
      expect(clamp(0, -10, -1)).toBe(-1)
      expect(clamp(-15, -10, -1)).toBe(-10)
    })

    it('should handle decimal numbers', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5)
      expect(clamp(1.5, 0, 1)).toBe(1)
      expect(clamp(-0.5, 0, 1)).toBe(0)
    })
  })
})