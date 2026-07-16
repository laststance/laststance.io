import { type MDXComponents } from 'mdx/types'
import {
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactElement,
} from 'react'

import { Mermaid } from '@/components/Mermaid'

/**
 * Props that MDX hands to a `<pre>` block. The single child is always the
 * matching `<code>` element produced by the markdown parser.
 */
type PreProps = ComponentPropsWithoutRef<'pre'>

/** Props that MDX hands to a native table generated from Markdown. */
type TableProps = ComponentPropsWithoutRef<'table'>

/** Shape of the `<code>` element nested inside an MDX `<pre>` block. */
type CodeChildProps = {
  className?: string
  children?: unknown
}

/**
 * Type guard for the `<code>` child of an MDX `<pre>`. We need this because
 * `pre.children` is typed loosely as ReactNode and we want to safely read the
 * className/children fields without `any`.
 */
function isCodeElement(node: unknown): node is ReactElement<CodeChildProps> {
  return (
    isValidElement(node) &&
    typeof (node.props as CodeChildProps | undefined)?.className === 'string'
  )
}

/** Recursively flattens MDX code children into a single string of source. */
function extractText(children: unknown): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (
    isValidElement<{ children?: unknown }>(children) &&
    children.props.children !== undefined
  ) {
    return extractText(children.props.children)
  }
  return ''
}

/**
 * Keeps wide MDX tables readable on narrow screens when the MDX renderer emits a native table.
 * @param props - Native table props generated from the article's Markdown table.
 * @returns A full-width table inside a locally scrollable mobile container.
 * @example
 * <ResponsiveTable><tbody><tr><td>Value</td></tr></tbody></ResponsiveTable>
 */
function ResponsiveTable({ className, ...props }: TableProps): ReactElement {
  const tableClassName = className
    ? `w-max min-w-full border-collapse ${className}`
    : 'w-max min-w-full border-collapse'

  return (
    <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:mx-0 sm:px-0">
      <table className={tableClassName} {...props} />
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: (props: PreProps) => {
      const child = props.children
      if (isCodeElement(child)) {
        const className = child.props.className ?? ''
        if (className.includes('language-mermaid')) {
          return <Mermaid chart={extractText(child.props.children).trim()} />
        }
      }
      return <pre {...props} />
    },
    table: ResponsiveTable,
  }
}
