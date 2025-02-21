import Image from 'next/image'
import { useState } from 'react'
import formatDate from '@/lib/utils/formatDate'
import SectionContainer from '@/components/layout/SectionContainer'
import Heading from '@/components/headings/Heading'
import Button from '@/components/links/Button'
import Link from '@/components/links/Link'
import SearchIcon from '@/components/icons/ui/SearchIcon'
import Author from '@/components/post/Author'
import Tag from '@/components/links/Tag'

const POSTS_PER_PAGE = 9

export default function CardLayout({ posts, heading, description, level = 'h2' }) {
  const [searchValue, setSearchValue] = useState('')
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE)

  const filteredPosts = posts.filter((post) => {
    const searchContent = (
      (post.title || '') +
      (post.summary || '') +
      (Array.isArray(post.tags) ? post.tags.join(' ') : '') +
      (Array.isArray(post.category) ? post.category.join(' ') : '') +
      (post.author || '')
    ).toLowerCase()
    return searchContent.includes(searchValue.toLowerCase())
  })

  const displayPosts = filteredPosts.slice(0, visiblePosts)

  return (
    <SectionContainer padding='medium' container='large'>
      <Heading text={heading} level={level} />
      {/* <p className='font-medium text-gray-800 dark:text-gray-300'>{description}</p> */}
      <div className='space-y-4'>
        <div className='mb-10 space-y-2 text-center'>
          <div className='relative max-w-lg'>
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles'
              className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
            <SearchIcon />
          </div>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {displayPosts.length === 0 ? (
            <p className='text-center font-semibold text-gray-600 dark:text-gray-400'>No posts found.</p>
          ) : (
            displayPosts.map((post) => {
              const { slug, date, title, summary, image, author, tags } = post
              const imagePath = `/static/images/featured/${image}.png`

              return (
                <Link key={slug} href={`/${slug}`} className='block'>
                  <article className='flex h-full cursor-pointer flex-col rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-black dark:hover:border-gray-300/60 dark:hover:bg-gray-850'>
                    <div className='relative h-40 w-full overflow-hidden rounded-t-lg'>
                      <Image
                        src={imagePath}
                        alt={title}
                        layout='fill'
                        objectFit='cover'
                        className='transform transition-transform duration-300 ease-in-out hover:scale-105'
                      />
                    </div>
                    <div className='flex flex-grow flex-col p-4'>
                      {/* <time
                        dateTime={date}
                        className='text-xxs font-semibold uppercase text-gray-600 dark:text-gray-500'
                      >
                        {formatDate(date)}
                      </time> */}
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}

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
            })
          )}
        </div>

        {visiblePosts < filteredPosts.length && (
          <div className='mt-10 flex justify-center'>
            <Button
              text='Load More'
              type='secondary'
              onClick={() => setVisiblePosts((prev) => prev + POSTS_PER_PAGE)}
            />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}
