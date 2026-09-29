import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { ReactNode } from 'react'
import React, { memo } from 'react'

const Link: React.FC<NextLinkProps & { children: ReactNode }> = memo(
  ({ children, ...rest }) => {
    return (
      // @ts-expect-error something wrong NextLinkProps?
      <NextLink className="link-hover transition" {...rest}>
        {children}
      </NextLink>
    )
  },
)
Link.displayName = 'Link'

export default Link
