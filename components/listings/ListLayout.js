import { useState } from 'react'

import formatDate from '@/lib/utils/formatDate'

import Link from '@/components/links/Link'
import Tag from '@/components/links/Tag'
import Pagination from '@/components/links/Pagination'
import PageTitle from '@/components/headings/PageTitle'
import LinkArrow from '@/components/links/LinkArrow'
import Badge from '@/components/links/Badge'

import SectionContainer from '@/components/layout/SectionContainer'

export default function ListLayout({ posts, title, description, initialDisplayPosts = [], pagination, directory }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = (
      (frontMatter.title || '') +
      (frontMatter.summary || '') +
      (Array.isArray(frontMatter.tags) ? frontMatter.tags.join(' ') : '') +
      (Array.isArray(frontMatter.category) ? frontMatter.category.join(' ') : '')
    ).toLowerCase()
    return searchContent.includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <SectionContainer container='small'>
        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
            <PageTitle>{title}</PageTitle>
            <p className='font-medium text-gray-800 dark:text-gray-300'>{description ? description : null}</p>
            <div className='relative max-w-lg'>
              <input
                aria-label='Search articles'
                type='text'
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Search articles'
                className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
              />
              <svg
                className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>
          <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
            {!filteredBlogPosts.length && (
              <span className='mt-6 font-semibold dark:text-gray-400 text-gray-600'>No posts found.</span>
            )}
            {displayPosts.map((frontMatter) => {
              const { slug, date, title, summary, tags, type, content_type } = frontMatter
              return (
                <li key={slug} className='group no-arrow py-2'>
                  <article className='space-y-1'>
                    <Link
                      href={`/${slug}`}
                      className='text-gray-900 transition-all duration-300 group-hover:border-l-4 group-hover:border-accent-300 group-hover:pl-4 dark:text-gray-200 dark:group-hover:border-accent-400 flex flex-col'
                    >
                      <div className='space-y-0.5 pt-4 xl:col-span-3'>
                        <div className='flex items-center gap-x-2'>
                          {date && (
                            <time
                              className='text-xs font-semibold uppercase text-gray-600 dark:text-gray-400'
                              dateTime={date}
                            >
                              {formatDate(date)}
                            </time>
                          )}{' '}
                          <span>|</span>
                          {content_type && <Badge text={content_type} />}
                        </div>

                        <div className='flex items-center gap-x-2 pt-1 pb-2'>
                          <h3 className='break-words pt-2 text-3xl font-bold tracking-tight hover:underline'>
                            {title}
                          </h3>
                        </div>
                        <div className='pb- flex flex-wrap gap-x-2 pb-1'>
                          {Array.isArray(tags) && tags.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                        <div className='prose max-w-none font-medium text-gray-700 dark:text-gray-300'>{summary}</div>
                        <LinkArrow text='Read More' direction='right' href={`/${slug}`} />
                      </div>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} directory={directory} />
        )}
      </SectionContainer>
    </>
  )
}
