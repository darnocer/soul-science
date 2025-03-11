'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from '@/components/links/Link'
import Tags from '@/components/links/Tags'
import Author from '@/components/post/Author'
import Badge from '@/components/links/Badge'

export default function BlogCard({ post, badge = false }) {
  const { slug, title, summary, image, author, tags, content_type } = post
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const imagePath = `/static/images/featured/${image}.jpg`
    const img = new window.Image()

    img.src = imagePath
    img.onload = () => setImageSrc(imagePath)
    img.onerror = () => setImageSrc('/static/images/featured/default.png')
  }, [image])

  return (
    <Link href={`/${slug}`} className='block'>
      <article className='group flex h-full cursor-pointer flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-150 hover:shadow-lg dark:border-gray-700 dark:bg-black dark:hover:border-gray-300/60 dark:hover:bg-gray-850'>
        <div className='relative h-40 w-full overflow-hidden rounded-t-lg'>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              layout='fill'
              objectFit='cover'
              loading='lazy'
              className='transform transition-transform duration-300 ease-in-out group-hover:scale-105'
            />
          ) : (
            <div className='h-full w-full animate-pulse bg-gray-200 dark:bg-gray-800'></div>
          )}
          {badge && (
            <div className='absolute right-2 top-2 z-10'>
              <Badge text={content_type} />
            </div>
          )}
        </div>
        <div className='flex flex-grow flex-col gap-2 p-4'>
          <Tags tags={tags} />
          <h3 className='mt-2 text-xl font-bold text-gray-900 dark:text-gray-200'>{title}</h3>
          <p className='mt-2 flex-grow text-sm font-medium text-gray-700 dark:text-gray-400'>{summary}</p>
          {author && (
            <div className='mt-4'>
              <Author author={author} />
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
