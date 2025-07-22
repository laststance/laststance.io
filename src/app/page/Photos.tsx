import clsx from 'clsx'
import Image from 'next/image'

import image1 from '../../images/photos/image-1.jpg'
import image2 from '../../images/photos/image-2.jpg'
import image3 from '../../images/photos/image-3.jpg'
import image4 from '../../images/photos/image-4.jpg'
import image5 from '../../images/photos/image-5.jpg'

export function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  const imageData = [
    { src: image1, alt: 'Personal photo showcasing development work' },
    { src: image2, alt: 'Creative coding project snapshot' },
    { src: image3, alt: 'Technology workspace environment' },
    { src: image4, alt: 'Software engineering collaboration' },
    { src: image5, alt: 'Programming achievement highlight' },
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {imageData.map((imageItem, imageIndex) => (
          <div
            key={imageItem.src.src}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={imageItem.src}
              alt={imageItem.alt}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              priority={imageIndex < 2}
              placeholder="blur"
              quality={85}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
