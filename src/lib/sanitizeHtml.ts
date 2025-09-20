import { load } from 'cheerio'

/**
 * sanitizeHtml removes script tags, inline event handlers, and javascript: URLs from HTML snippets.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) {
    return ''
  }

  const $ = load(html, {
    decodeEntities: false,
    xmlMode: false,
  })

  $('script').remove()

  $('*').each((_, element) => {
    const attribs = element.attribs ?? {}

    Object.keys(attribs).forEach((attribute) => {
      const attributeName = attribute.toLowerCase()

      if (attributeName.startsWith('on')) {
        $(element).removeAttr(attribute)
        return
      }

      if (attributeName === 'href' || attributeName === 'src') {
        const value = attribs[attribute]
        if (typeof value === 'string' && value.trim().toLowerCase().startsWith('javascript:')) {
          $(element).removeAttr(attribute)
        }
      }
    })
  })

  return $.html()
}
