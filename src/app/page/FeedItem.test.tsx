import { render } from '@testing-library/react'
import React from 'react'

import type { ValidatedFeed } from '@/lib/octokit'

import { FeedItem } from './FeedItem'

// Mock feed data for testing
const createMockFeed = (content: string): ValidatedFeed => ({
  id: ['test-id'],
  title: [{ $: { type: 'html' }, _: 'Test Title' }],
  author: [
    {
      name: ['Test Author'],
      email: ['test@example.com'],
      uri: ['http://example.com'],
    },
  ],
  content: [{ $: { type: 'html' }, _: content }],
  link: [
    { $: { href: 'http://example.com', rel: 'alternate', type: 'text/html' } },
  ],
  'media:thumbnail': [
    { $: { height: '30', url: 'http://example.com/thumb.jpg', width: '30' } },
  ],
  published: ['2024-01-01T00:00:00Z'],
  updated: ['2024-01-01T00:00:00Z'],
})

describe('FeedItem XSS Protection', () => {
  test('renders safe HTML content', () => {
    const safeContent = '<p>This is safe content</p>'
    const mockFeed = createMockFeed(safeContent)

    const { container } = render(<FeedItem feed={mockFeed} />)
    expect(container.innerHTML).toContain('This is safe content')
  })

  test('removes malicious script tags from content', () => {
    const maliciousContent = '<p>Safe content</p><script>alert("XSS")</script>'
    const mockFeed = createMockFeed(maliciousContent)

    const { container } = render(<FeedItem feed={mockFeed} />)

    // Should contain safe content
    expect(container.innerHTML).toContain('Safe content')
    // Should NOT contain script tag
    expect(container.innerHTML).not.toContain('<script>')
    expect(container.innerHTML).not.toContain('alert("XSS")')
  })

  test('removes dangerous event handlers from content', () => {
    const maliciousContent = '<div onclick="alert(\'XSS\')">Click me</div>'
    const mockFeed = createMockFeed(maliciousContent)

    const { container } = render(<FeedItem feed={mockFeed} />)

    // Should contain the div content
    expect(container.innerHTML).toContain('Click me')
    // Should NOT contain onclick handler
    expect(container.innerHTML).not.toContain('onclick')
    expect(container.innerHTML).not.toContain('alert(')
  })

  test('removes javascript: protocols from links', () => {
    const maliciousContent = '<a href="javascript:alert(\'XSS\')">Link</a>'
    const mockFeed = createMockFeed(maliciousContent)

    const { container } = render(<FeedItem feed={mockFeed} />)

    // Should contain the link text
    expect(container.innerHTML).toContain('Link')
    // Should NOT contain javascript: protocol
    expect(container.innerHTML).not.toContain('javascript:')
  })

  test('preserves legitimate HTML structure', () => {
    const legitimateContent =
      '<div><p><strong>Bold text</strong> and <em>italic text</em></p><a href="https://example.com">Link</a></div>'
    const mockFeed = createMockFeed(legitimateContent)

    const { container } = render(<FeedItem feed={mockFeed} />)

    // Should preserve legitimate HTML tags
    expect(container.innerHTML).toContain('<strong>')
    expect(container.innerHTML).toContain('<em>')
    expect(container.innerHTML).toContain('Bold text')
    expect(container.innerHTML).toContain('italic text')
    expect(container.innerHTML).toContain('href="https://example.com"')
  })
})
