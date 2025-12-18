import { describe, it, expect } from 'vitest'

/**
 * Test suite for OG image route sanitization logic.
 * Since the sanitizeTitle function is internal to the route,
 * we replicate the logic here for unit testing.
 */

const MAX_TITLE_LENGTH = 200
const DEFAULT_TITLE = 'Laststance.io'

/**
 * Sanitizes the title parameter for OG image generation.
 * Replicates the route's internal sanitization for testing.
 * @param input - Raw title string from query params
 * @returns Sanitized title string
 */
const sanitizeTitle = (input: string | null): string => {
  if (!input || typeof input !== 'string') {
    return DEFAULT_TITLE
  }

  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '')
  sanitized = sanitized.replace(/[<>]/g, '')
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/data:/gi, '')
  sanitized = sanitized.trim().slice(0, MAX_TITLE_LENGTH)

  return sanitized || DEFAULT_TITLE
}

describe('OG Route - sanitizeTitle', () => {
  describe('default behavior', () => {
    it('should return default title for null input', () => {
      expect(sanitizeTitle(null)).toBe(DEFAULT_TITLE)
    })

    it('should return default title for empty string', () => {
      expect(sanitizeTitle('')).toBe(DEFAULT_TITLE)
    })

    it('should return valid title unchanged', () => {
      expect(sanitizeTitle('My Blog Post')).toBe('My Blog Post')
    })

    it('should preserve unicode characters', () => {
      expect(sanitizeTitle('日本語タイトル')).toBe('日本語タイトル')
    })

    it('should preserve emoji', () => {
      expect(sanitizeTitle('🚀 Launch Day')).toBe('🚀 Launch Day')
    })
  })

  describe('XSS prevention', () => {
    it('should remove script tags', () => {
      expect(sanitizeTitle('<script>alert(1)</script>')).toBe('scriptalert(1)/script')
    })

    it('should remove angle brackets', () => {
      expect(sanitizeTitle('<div>test</div>')).toBe('divtest/div')
    })

    it('should remove javascript: protocol', () => {
      expect(sanitizeTitle('javascript:alert(1)')).toBe('alert(1)')
    })

    it('should remove javascript: case insensitive', () => {
      expect(sanitizeTitle('JAVASCRIPT:alert(1)')).toBe('alert(1)')
      expect(sanitizeTitle('JaVaScRiPt:alert(1)')).toBe('alert(1)')
    })

    it('should remove data: protocol', () => {
      expect(sanitizeTitle('data:text/html,<script>alert(1)</script>')).toBe(
        'text/html,scriptalert(1)/script',
      )
    })

    it('should remove data: case insensitive', () => {
      expect(sanitizeTitle('DATA:text/html')).toBe('text/html')
    })

    it('should handle multiple injection attempts', () => {
      const malicious =
        '<script>javascript:data:<img onerror="alert(1)">'
      const result = sanitizeTitle(malicious)
      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
      expect(result).not.toContain('javascript:')
      expect(result).not.toContain('data:')
    })
  })

  describe('control character removal', () => {
    it('should remove null bytes', () => {
      expect(sanitizeTitle('test\x00value')).toBe('testvalue')
    })

    it('should remove newlines', () => {
      expect(sanitizeTitle('line1\nline2')).toBe('line1line2')
    })

    it('should remove carriage returns', () => {
      expect(sanitizeTitle('line1\rline2')).toBe('line1line2')
    })

    it('should remove tabs', () => {
      expect(sanitizeTitle('word1\tword2')).toBe('word1word2')
    })

    it('should remove bell character', () => {
      expect(sanitizeTitle('test\x07bell')).toBe('testbell')
    })

    it('should remove escape character', () => {
      expect(sanitizeTitle('test\x1Bescape')).toBe('testescape')
    })

    it('should remove DEL character', () => {
      expect(sanitizeTitle('test\x7Fdel')).toBe('testdel')
    })
  })

  describe('length limiting', () => {
    it('should truncate titles longer than MAX_TITLE_LENGTH', () => {
      const longTitle = 'a'.repeat(300)
      expect(sanitizeTitle(longTitle)).toHaveLength(MAX_TITLE_LENGTH)
    })

    it('should preserve titles at exactly MAX_TITLE_LENGTH', () => {
      const exactTitle = 'a'.repeat(MAX_TITLE_LENGTH)
      expect(sanitizeTitle(exactTitle)).toHaveLength(MAX_TITLE_LENGTH)
    })

    it('should preserve short titles', () => {
      const shortTitle = 'Short Title'
      expect(sanitizeTitle(shortTitle)).toBe(shortTitle)
    })
  })

  describe('whitespace handling', () => {
    it('should trim leading whitespace', () => {
      expect(sanitizeTitle('   Title')).toBe('Title')
    })

    it('should trim trailing whitespace', () => {
      expect(sanitizeTitle('Title   ')).toBe('Title')
    })

    it('should trim both leading and trailing whitespace', () => {
      expect(sanitizeTitle('   Title   ')).toBe('Title')
    })

    it('should preserve internal whitespace', () => {
      expect(sanitizeTitle('My Blog Post')).toBe('My Blog Post')
    })

    it('should return default for whitespace-only input', () => {
      expect(sanitizeTitle('   ')).toBe(DEFAULT_TITLE)
    })
  })

  describe('edge cases', () => {
    it('should handle title with only removed characters', () => {
      expect(sanitizeTitle('<>')).toBe(DEFAULT_TITLE)
    })

    it('should handle mixed valid and invalid content', () => {
      expect(sanitizeTitle('Valid <script> Title')).toBe('Valid script Title')
    })

    it('should handle URL-encoded content (not decoded)', () => {
      // URL encoding is not decoded by this function
      expect(sanitizeTitle('%3Cscript%3E')).toBe('%3Cscript%3E')
    })

    it('should handle special regex characters safely', () => {
      expect(sanitizeTitle('Title (with) [brackets] {braces}')).toBe(
        'Title (with) [brackets] {braces}',
      )
    })

    it('should handle quotes safely', () => {
      expect(sanitizeTitle("Title with 'single' and \"double\" quotes")).toBe(
        "Title with 'single' and \"double\" quotes",
      )
    })
  })

  describe('real-world blog post titles', () => {
    it('should handle technical titles', () => {
      expect(sanitizeTitle('Building a REST API with Node.js')).toBe(
        'Building a REST API with Node.js',
      )
    })

    it('should handle titles with symbols', () => {
      expect(sanitizeTitle('React 19 - What\'s New?')).toBe(
        'React 19 - What\'s New?',
      )
    })

    it('should handle titles with numbers', () => {
      expect(sanitizeTitle('10 Tips for Better TypeScript')).toBe(
        '10 Tips for Better TypeScript',
      )
    })

    it('should handle titles with special characters', () => {
      expect(sanitizeTitle('C++ vs Rust: A Comparison')).toBe(
        'C++ vs Rust: A Comparison',
      )
    })
  })
})
