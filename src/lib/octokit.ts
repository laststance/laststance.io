import process from 'node:process'

import { parse } from 'node-html-parser'
import { Octokit } from 'octokit'
import { parseStringPromise } from 'xml2js'

const octokit = new Octokit({
  auth: process.env.PERSONAL_ACCESS_TOKEN || undefined,
})

const getXml = async (page: number) => {
  try {
    if (!process.env.PERSONAL_ACCESS_TOKEN) {
      console.warn('Missing PERSONAL_ACCESS_TOKEN environment variable')
      return { feed: { entry: [] } }
    }

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

export const fetchGithubFeedList = async (): Promise<Array<Feed | null>> => {
  try {
    const [xml1, xml2, xml3, xml4, xml5, xml6, xml7, xml8, xml9, xml10] =
      await Promise.all([
        getXml(1),
        getXml(2),
        getXml(3),
        getXml(4),
        getXml(5),
        getXml(6),
        getXml(7),
        getXml(8),
        getXml(9),
        getXml(10),
      ])

    // Check if each XML has feed and entry properties before spreading
    const allEntries = [
      ...(xml1['feed']?.['entry'] || []),
      ...(xml2['feed']?.['entry'] || []),
      ...(xml3['feed']?.['entry'] || []),
      ...(xml4['feed']?.['entry'] || []),
      ...(xml5['feed']?.['entry'] || []),
      ...(xml6['feed']?.['entry'] || []),
      ...(xml7['feed']?.['entry'] || []),
      ...(xml8['feed']?.['entry'] || []),
      ...(xml9['feed']?.['entry'] || []),
      ...(xml10['feed']?.['entry'] || []),
    ]

    if (allEntries.length === 0) {
      console.warn('No GitHub feed entries found')
      return []
    }

    const feedList = allEntries
      .map((f: Feed) => {
        try {
          // Parse the HTML content
          const root = parse(f.content[0]._)

          // Filter auto dependecy update by dependabot
          if (root.innerText.includes('Dependabot')) return null
          if (root.innerText.includes('dependabot')) return null
          if (root.innerText.includes('Bump')) return null
          if (root.innerText.includes('bump')) return null

          // Update all href attributes
          root.querySelectorAll('a').forEach((link) => {
            const href = link.getAttribute('href')
            if (href && !href.startsWith('http')) {
              link.setAttribute('href', `https://github.com${href}`)
            }
          })

          // Return the updated HTML content as a string
          f.content[0]._ = root.toString()
          return f
        } catch (error) {
          console.error('Error processing feed entry:', error)
          return null
        }
      })
      .filter(Boolean) // Filter out null entries

    return feedList
  } catch (error) {
    console.error('Error fetching GitHub feed:', error)
    return []
  }
}

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
