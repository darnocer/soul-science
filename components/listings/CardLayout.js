'use client'

import { useState } from 'react'
import SectionContainer from '@/components/layout/SectionContainer'
import Heading from '@/components/headings/Heading'
import Button from '@/components/links/Button'
import SearchIcon from '@/components/icons/ui/SearchIcon'
import BlogCard from '@/components/listings/BlogCard'

const POSTS_PER_PAGE = 9

export default function CardLayout({ posts, heading, description, level, badge = false }) {
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
      <Heading level={level}>{heading}</Heading>
      <div className='space-y-4'>
        <div className='mb-10 space-y-2 text-center'>
          <div className='relative max-w-lg'>
            <input
              aria-label='Search posts'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search posts'
              className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
            <SearchIcon />
          </div>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {displayPosts.length === 0 ? (
            <p className='text-center font-semibold text-gray-600 dark:text-gray-400'>No posts found.</p>
          ) : (
            displayPosts.map((post) => <BlogCard key={post.slug} post={post} badge={badge} />)
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
