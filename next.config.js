import withBundleAnalyzerOriginal from '@next/bundle-analyzer'
import nextMDX from '@next/mdx'

const withBundleAnalyzer = withBundleAnalyzerOriginal({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = nextMDX({})

export default withBundleAnalyzer(withMDX(nextConfig))
