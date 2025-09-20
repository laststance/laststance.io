import { unstable_cache } from 'next/cache'
import { parse } from 'node-html-parser'
import { Octokit } from 'octokit'
import { parseStringPromise } from 'xml2js'

import { env } from '@/env.mjs'

const octokit = new Octokit({
  auth: env.PERSONAL_ACCESS_TOKEN || undefined,
})

const getXml = async (page: number) => {
  try {
    const res = await octokit.request(
      `GET https://github.com/ryota-murakami.atom?page=${page}`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    )
    const xml = await parseStringPromise(res.data)
    return xml
  } catch (error) {
    console.error(`Error fetching GitHub feed page ${page}:`, error)
    return { feed: { entry: [] } }
  }
}

const processFeedEntry = (f: Feed): Feed | null => {
  try {
    // Parse the HTML content
    const root = parse(f.content[0]._)

    // Filter auto dependency updates by dependabot
    if (root.innerText.includes('Dependabot')) return null
    if (root.innerText.includes('dependabot')) return null
    if (root.innerText.includes('Bump')) return null
    if (root.innerText.includes('bump')) return null

    // Filter private repository activity
    if (root.innerText.includes('hayashima')) return null

    // Update all href attributes
    root.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href')
      if (href && !href.startsWith('http')) {
        link.setAttribute('href', `https://github.com${href}`)
      }
    })

    // Drop relative stylesheet links that can't be resolved at build time
    root.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const href = link.getAttribute('href')
      if (!href) return
      if (href.startsWith('http')) return
      link.remove()
    })

    // Normalise image sources to absolute URLs
    root.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src')
      if (!src) return
      if (src.startsWith('http')) return
      if (src.startsWith('//')) {
        img.setAttribute('src', `https:${src}`)
        return
      }
      img.setAttribute('src', `https://github.com${src}`)
    })

    // Remove potentially dangerous nodes and attributes
    root
      .querySelectorAll('script, style, iframe, object, embed')
      .forEach((node) => node.remove())

    root.querySelectorAll('*').forEach((element) => {
      Object.keys(element.attributes).forEach((attr) => {
        if (attr.toLowerCase().startsWith('on')) {
          element.removeAttribute(attr)
        }
      })
    })

    // Return the updated HTML content as a string
    f.content[0]._ = root.toString()
    return f
  } catch (error) {
    console.error('Error processing feed entry:', error)
    return null
  }
}

const fetchGithubFeedListUncached = async (): Promise<Array<Feed | null>> => {
  const MAX_PAGES = 5 // Reduced from 10 to 5
  const MIN_ENTRIES_PER_PAGE = 5 // Stop if page has fewer than this many entries
  const allEntries: Feed[] = []

  try {
    console.log('Fetching GitHub feed data...')

    for (let page = 1; page <= MAX_PAGES; page++) {
      try {
        console.log(`Fetching page ${page}...`)
        const xmlData = await getXml(page)
        const entries = xmlData['feed']?.['entry'] || []

        if (entries.length === 0) {
          console.log(`Page ${page} is empty, stopping pagination`)
          break
        }

        console.log(`Page ${page} contains ${entries.length} entries`)
        allEntries.push(...entries)

        // Stop early if we get fewer entries than expected (likely last page)
        if (entries.length < MIN_ENTRIES_PER_PAGE) {
          console.log(
            `Page ${page} has fewer than ${MIN_ENTRIES_PER_PAGE} entries, stopping pagination`,
          )
          break
        }

        // Add a small delay between requests to avoid rate limiting
        if (page < MAX_PAGES) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      } catch (pageError) {
        console.error(`Failed to fetch page ${page}:`, pageError)
        // Continue with next page instead of failing completely
        continue
      }
    }

    if (allEntries.length === 0) {
      console.warn('No GitHub feed entries found across all pages')
      return []
    }

    console.log(`Total entries fetched: ${allEntries.length}`)

    // Process and filter entries
    const feedList = allEntries.map(processFeedEntry).filter(Boolean) // Filter out null entries

    console.log(`Processed entries after filtering: ${feedList.length}`)
    return feedList
  } catch (error) {
    console.error('Error fetching GitHub feed:', error)
    return []
  }
}

// Cached version with 1-hour revalidation
export const fetchGithubFeedList = unstable_cache(
  fetchGithubFeedListUncached,
  ['github-feed'],
  {
    revalidate: 3600, // 1 hour in seconds
    tags: ['github-feed'],
  },
)

export type Feed = {
  id: string[]
  title: {
    $: {
      type: string
    }
    _: string
  }[]
  author: {
    name: string[]
    email: string[]
    uri: string[]
  }[]
  content: {
    $: {
      type: string
    }
    _: string
  }[]
  link: {
    $: {
      href: string
      rel: string
      type: string
    }
  }[]
  'media:thumbnail': {
    $: {
      height: string
      url: string
      width: string
    }
  }[]
  published: string[]
  updated: string[]
}
