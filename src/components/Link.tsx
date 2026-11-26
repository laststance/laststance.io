import NextLink from 'next/link'
import type { ComponentProps, FC, ReactNode } from 'react'
import { memo } from 'react'

const Link: FC<
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
