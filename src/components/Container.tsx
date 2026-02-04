import clsx from 'clsx'

export const ContainerOuter = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
}

export const ContainerInner = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      id="mobile-side-padding-container"
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div id="InnerContainer" className="mx-auto max-w-2xl lg:max-w-5xl">
        {children}
      </div>
    </div>
  )
}

export const Container = ({
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ContainerOuter>) => {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
}
