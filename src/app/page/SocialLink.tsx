import Link from 'next/link'

export function SocialLink({
  icon: Icon,
  href,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
  href: string
}) {
  const isExternalLink =
    href.startsWith('http') &&
    !href.startsWith(process.env.NEXT_PUBLIC_SITE_URL || '')

  return (
    <Link
      href={href}
      className="group -m-1 p-1"
      {...(isExternalLink
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}
