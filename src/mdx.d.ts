declare module '*.mdx' {
  import type { ArticleWithSlug } from '@/lib/articles'

  export const article: ArticleWithSlug
  const MDXComponent: React.ComponentType
  export default MDXComponent
}
