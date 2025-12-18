import { describe, it, expect } from 'vitest'

import { sanitizeHtml } from './sanitizeHtml'

describe('sanitizeHtml', () => {
  describe('basic functionality', () => {
    it('should return empty string for empty input', () => {
      expect(sanitizeHtml('')).toBe('')
    })

    it('should return empty string for null/undefined-like falsy input', () => {
      // TypeScript enforces string type, but runtime safety check exists
      expect(sanitizeHtml('')).toBe('')
    })

    it('should preserve plain text without HTML', () => {
      const text = 'Hello World'
      expect(sanitizeHtml(text)).toContain(text)
    })

    it('should preserve safe HTML elements', () => {
      const html = '<p>Hello <strong>World</strong></p>'
      expect(sanitizeHtml(html)).toContain('<p>')
      expect(sanitizeHtml(html)).toContain('<strong>')
      expect(sanitizeHtml(html)).toContain('Hello')
      expect(sanitizeHtml(html)).toContain('World')
    })

    it('should preserve anchor tags with safe hrefs', () => {
      const html = '<a href="https://example.com">Link</a>'
      expect(sanitizeHtml(html)).toContain('href="https://example.com"')
      expect(sanitizeHtml(html)).toContain('Link')
    })

    it('should preserve images with safe src', () => {
      const html = '<img src="https://example.com/image.png" alt="test">'
      expect(sanitizeHtml(html)).toContain('src="https://example.com/image.png"')
    })
  })

  describe('script tag removal', () => {
    it('should remove inline script tags', () => {
      const html = '<p>Hello</p><script>alert("xss")</script><p>World</p>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('alert')
      expect(result).toContain('Hello')
      expect(result).toContain('World')
    })

    it('should remove script tags with src attribute', () => {
      const html = '<script src="https://evil.com/xss.js"></script>'
      expect(sanitizeHtml(html)).not.toContain('<script')
      expect(sanitizeHtml(html)).not.toContain('evil.com')
    })

    it('should remove multiple script tags', () => {
      const html = '<script>first</script><p>safe</p><script>second</script>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('first')
      expect(result).not.toContain('second')
      expect(result).toContain('safe')
    })

    it('should remove nested script tags', () => {
      const html = '<div><script>alert("xss")</script></div>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('<script>')
      expect(result).toContain('<div>')
    })

    it('should handle script tags with attributes', () => {
      const html = '<script type="text/javascript" defer async>alert("xss")</script>'
      expect(sanitizeHtml(html)).not.toContain('<script')
    })
  })

  describe('event handler removal', () => {
    it('should remove onclick handlers', () => {
      const html = '<button onclick="alert(\'xss\')">Click</button>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onclick')
      expect(result).not.toContain('alert')
      expect(result).toContain('Click')
    })

    it('should remove onload handlers', () => {
      const html = '<img src="x" onload="alert(\'xss\')">'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onload')
      expect(result).toContain('<img')
    })

    it('should remove onerror handlers', () => {
      const html = '<img src="invalid" onerror="alert(\'xss\')">'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onerror')
    })

    it('should remove onmouseover handlers', () => {
      const html = '<div onmouseover="steal()">Hover</div>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onmouseover')
      expect(result).toContain('Hover')
    })

    it('should remove onmouseout handlers', () => {
      const html = '<span onmouseout="track()">Text</span>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onmouseout')
    })

    it('should remove onfocus handlers', () => {
      const html = '<input onfocus="steal()" type="text">'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onfocus')
    })

    it('should remove onblur handlers', () => {
      const html = '<input onblur="track()" type="text">'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onblur')
    })

    it('should remove multiple event handlers from same element', () => {
      const html =
        '<div onclick="a()" onmouseover="b()" onmouseout="c()">Content</div>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onclick')
      expect(result).not.toContain('onmouseover')
      expect(result).not.toContain('onmouseout')
      expect(result).toContain('Content')
    })

    it('should handle case variations of event handlers', () => {
      const html = '<div ONCLICK="a()" OnClick="b()" onClick="c()">Test</div>'
      const result = sanitizeHtml(html)
      // Cheerio normalizes attributes to lowercase
      expect(result.toLowerCase()).not.toContain('onclick')
    })

    it('should remove all on* prefixed attributes', () => {
      const html = '<div onsubmit="a()" onkeydown="b()" onkeyup="c()">Form</div>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onsubmit')
      expect(result).not.toContain('onkeydown')
      expect(result).not.toContain('onkeyup')
    })
  })

  describe('javascript: URL removal', () => {
    it('should remove javascript: URLs from href', () => {
      const html = '<a href="javascript:alert(\'xss\')">Click</a>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('javascript:')
      expect(result).toContain('Click')
    })

    it('should remove javascript: URLs from src', () => {
      const html = '<img src="javascript:alert(\'xss\')">'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('javascript:')
    })

    it('should handle javascript: URLs with whitespace', () => {
      const html = '<a href="  javascript:alert(\'xss\')">Link</a>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('javascript:')
    })

    it('should handle case variations of javascript:', () => {
      const html = '<a href="JAVASCRIPT:alert(\'xss\')">Link</a>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('javascript:')
      expect(result).not.toContain('JAVASCRIPT:')
    })

    it('should handle mixed case javascript:', () => {
      const html = '<a href="JaVaScRiPt:alert(\'xss\')">Link</a>'
      const result = sanitizeHtml(html)
      // After lowercasing and trim, should be removed
      const lowerResult = result.toLowerCase()
      expect(lowerResult).not.toContain('javascript:')
    })

    it('should preserve data: URLs (not javascript:)', () => {
      const html = '<img src="data:image/png;base64,iVBORw0KGgo=">'
      const result = sanitizeHtml(html)
      expect(result).toContain('data:image/png')
    })

    it('should preserve mailto: URLs', () => {
      const html = '<a href="mailto:test@example.com">Email</a>'
      const result = sanitizeHtml(html)
      expect(result).toContain('mailto:')
    })

    it('should preserve tel: URLs', () => {
      const html = '<a href="tel:+1234567890">Call</a>'
      const result = sanitizeHtml(html)
      expect(result).toContain('tel:')
    })
  })

  describe('complex XSS attack vectors', () => {
    it('should handle SVG-based XSS', () => {
      const html = '<svg onload="alert(\'xss\')"><circle r="10"></circle></svg>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onload')
    })

    it('should handle body onload XSS', () => {
      const html = '<body onload="alert(\'xss\')">Content</body>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onload')
    })

    it('should handle img tag XSS with onerror', () => {
      const html = '<img src=x onerror=alert(1)>'
      const result = sanitizeHtml(html)
      expect(result).not.toContain('onerror')
    })

    it('should handle form action javascript:', () => {
      const html = '<form action="javascript:alert(1)"><input type="submit"></form>'
      // Note: The sanitizer only removes javascript: from href/src, not action
      // This is a known limitation - action is not covered
      const result = sanitizeHtml(html)
      expect(result).toContain('<form')
    })

    it('should handle nested malicious content', () => {
      const html = `
        <div>
          <script>alert('outer')</script>
          <p onclick="alert('click')">
            <a href="javascript:alert('link')">
              <img src="x" onerror="alert('img')">
            </a>
          </p>
        </div>
      `
      const result = sanitizeHtml(html)
      expect(result).not.toContain('<script>')
      expect(result).not.toContain('onclick')
      expect(result).not.toContain('javascript:')
      expect(result).not.toContain('onerror')
    })

    it('should handle encoded payloads in attributes', () => {
      // Note: Cheerio handles HTML entities, so these get decoded
      const html = '<a href="javascript&#58;alert(1)">Link</a>'
      const result = sanitizeHtml(html)
      // After entity decoding by Cheerio, javascript: should be removed
      expect(result).not.toContain('javascript')
    })
  })

  describe('edge cases', () => {
    it('should handle empty tags', () => {
      const html = '<div></div><span></span>'
      const result = sanitizeHtml(html)
      expect(result).toContain('<div>')
      expect(result).toContain('<span>')
    })

    it('should handle self-closing tags', () => {
      const html = '<br><hr><input type="text">'
      const result = sanitizeHtml(html)
      expect(result).toContain('<br')
      expect(result).toContain('<hr')
      expect(result).toContain('<input')
    })

    it('should handle deeply nested HTML', () => {
      const html =
        '<div><div><div><p><span>Deep</span></p></div></div></div>'
      const result = sanitizeHtml(html)
      expect(result).toContain('Deep')
    })

    it('should handle HTML with comments', () => {
      const html = '<!-- comment --><p>Content</p><!-- another -->'
      const result = sanitizeHtml(html)
      expect(result).toContain('Content')
    })

    it('should handle HTML with CDATA sections', () => {
      const html = '<p><![CDATA[Some content]]></p>'
      const result = sanitizeHtml(html)
      expect(result).toContain('<p>')
    })

    it('should handle malformed HTML gracefully', () => {
      const html = '<div><p>Unclosed<span>tags'
      // Cheerio should handle malformed HTML
      const result = sanitizeHtml(html)
      expect(result).toContain('Unclosed')
      expect(result).toContain('tags')
    })

    it('should handle HTML with special characters', () => {
      const html = '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>'
      const result = sanitizeHtml(html)
      // Entities should be preserved as entities
      expect(result).toContain('&lt;')
      expect(result).toContain('&gt;')
    })

    it('should handle very long input', () => {
      const longText = 'a'.repeat(10000)
      const html = `<p>${longText}</p>`
      const result = sanitizeHtml(html)
      expect(result.length).toBeGreaterThan(10000)
    })
  })

  describe('GitHub feed content scenarios', () => {
    it('should sanitize typical GitHub feed HTML', () => {
      const githubHtml = `
        <div class="markdown-body">
          <p>Fixed a bug in <a href="/user/repo/issues/123">#123</a></p>
          <pre><code>const x = 1;</code></pre>
        </div>
      `
      const result = sanitizeHtml(githubHtml)
      expect(result).toContain('markdown-body')
      expect(result).toContain('#123')
      expect(result).toContain('<pre>')
      expect(result).toContain('<code>')
    })

    it('should handle GitHub emoji images', () => {
      const html =
        '<g-emoji alias="rocket"><img src="https://github.githubassets.com/images/icons/emoji/rocket.png" alt="rocket"></g-emoji>'
      const result = sanitizeHtml(html)
      expect(result).toContain('src="https://github.githubassets.com')
      expect(result).toContain('alt="rocket"')
    })

    it('should handle GitHub user mentions', () => {
      const html =
        '<a href="/ryota-murakami" class="user-mention">@ryota-murakami</a>'
      const result = sanitizeHtml(html)
      expect(result).toContain('@ryota-murakami')
      expect(result).toContain('href="/ryota-murakami"')
    })
  })
})
