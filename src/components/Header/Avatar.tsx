import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import avatarImage from '../../images/logo.png'

export function Avatar({
  className,
  large = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  const t = useTranslations('Header')
  return (
    <Link
      href="/"
      aria-label={t('homeLabel')}
      className={clsx(
        className,
        'pointer-events-auto',
        large
          ? 'block size-16'
          : 'inline-flex size-11 items-center justify-center',
      )}
      {...props}
    >
      <Image
        src={avatarImage}
        alt={t('avatarAlt')}
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        priority
      />
    </Link>
  )
}
