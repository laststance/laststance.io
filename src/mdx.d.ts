declare module '*.mdx' {
  import type { ArticleMetadata } from '@/lib/articles'

  export const article: ArticleMetadata
  const MDXComponent: React.ComponentType
  export default MDXComponent
}
