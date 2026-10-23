import NextLink from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import React, { memo } from 'react'

const Link: React.FC<
  ComponentProps<typeof NextLink> & { children: ReactNode }
> = memo(({ children, ...rest }) => {
  return (
    <NextLink className="link-hover transition" {...rest}>
      {children}
    </NextLink>
  )
})
Link.displayName = 'Link'

export default Link
