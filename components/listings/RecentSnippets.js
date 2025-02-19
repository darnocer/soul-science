import { useEffect, useState } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import formatDateShort from '@/lib/utils/formatDateShort'
import LinkArrow from '@/components/links/LinkArrow'
import Link from '@/components/links/Link'
import Tag from '@/components/links/Tag'
import Heading from '@/components/headings/Heading'
import ChevronRight from '@/components/icons/ui/ChevronRightIcon'
import SectionContainer from '@/components/layout/SectionContainer'
import Badge from '@/components/links/Badge'
import { MDXComponents } from '@/components/MDXComponents'

const MAX_SNIPPETS = 10
const MAX_PREVIEW_LENGTH = 1500

export default function RecentSnippets({ heading, numPosts = MAX_SNIPPETS }) {
  const [snippets, setSnippets] = useState([])

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const response = await fetch(`/api/previews?maxLength=${MAX_PREVIEW_LENGTH}`)
        if (!response.ok) throw new Error('Failed to fetch snippets')
        const data = await response.json()
        setSnippets(data.slice(0, numPosts))
      } catch (error) {
        console.error(error)
      }
    }
    fetchSnippets()
  }, [numPosts])

  return (
    <>
      <Heading text={heading} />
      <div className='space-y-6'>
        <ul className='space-y-6 divide-y divide-gray-200 dark:divide-gray-700'>
          {snippets.length === 0 && 'No snippets found.'}
          {snippets.map(({ frontMatter, mdxSource, isTruncated }) => {
            const { slug, date, title, tags, content_type } = frontMatter
            return (
              <li key={slug} className='group no-arrow py-2'>
                <article className='flex flex-col gap-2'>
                  <div className='flex items-center gap-x-2'>
                    {/* {date && (
                      <time
                        className='text-xs font-semibold uppercase text-gray-600 dark:text-gray-400'
                        dateTime={date}
                      >
                        {formatDateShort(date)}
                      </time>
                    )}{' '} */}
                    {/* <span className='text-gray-700 dark:text-gray-400'>|</span>
                    {content_type && <Badge text={content_type} />} */}
                    {/* <span className='text-gray-700 dark:text-gray-400'>|</span> */}
                    {tags && (
                      <div className='flex items-baseline gap-x-2 my-2'>
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    )}
                  </div>

                  <Link href={`/${slug}`} className='text-gray-900 dark:text-gray-200'>
                    <h3 className='text-3xl font-bold tracking-tight hover:underline'>{title}</h3>
                  </Link>

                  <div className='mdx-preview prose prose-sm max-w-full'>
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                    {/* {isTruncated && (
                      <Link
                        href={`/${slug}`}
                        className='inline-flex justify-center items-center font-semibold font-sans tracking-tight hover:underline'
                      >
                        Read More <ChevronRight className='mb-1' />
                      </Link>
                    )} */}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <div className='mt-2'>
          {snippets.length >= numPosts && <LinkArrow text='See All Musings' direction='right' href={`/musings`} />}
        </div>
      </div>
    </>
  )
}
