import withBundleAnalyzerOriginal from '@next/bundle-analyzer'
import nextMDX from '@next/mdx'

const withBundleAnalyzer = withBundleAnalyzerOriginal({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90, 95],
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: ['@mapbox/rehype-prism'],
  },
})

export default withBundleAnalyzer(withMDX(nextConfig))
