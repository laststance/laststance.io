import rehypePrism from '@mapbox/rehype-prism'
import withBundleAnalyzerOriginal from '@next/bundle-analyzer'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withBundleAnalyzer = withBundleAnalyzerOriginal({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
    remarkPlugins: [remarkGfm],
  },
})

export default withBundleAnalyzer(withMDX(nextConfig))
