import Link from '@/components/links/Link'
import formatDateShort from '@/lib/utils/formatDateShort'
import LinkArrow from '@/components/links/LinkArrow'
import Heading from '@/components/headings/Heading'
import SectionContainer from '@/components/layout/SectionContainer'
import Tags from '@/components/links/Tags'
import Badge from '@/components/links/Badge'

const MAX_DISPLAY = 5

export default function RecentPosts({ posts, heading, directory, categoryFilter, typeFilter, tagFilter }) {
  const filteredByType = typeFilter
    ? posts.filter((post) => {
        if (typeFilter.startsWith('!')) {
          return !post.content_type.includes(typeFilter.substring(1)) // Exclude type
        }
        return post.content_type.includes(typeFilter) // Include type
      })
    : posts

  const filteredByCategory = categoryFilter
    ? filteredByType.filter((post) => post.category.some((cat) => categoryFilter.includes(cat)))
    : filteredByType

  const filteredByTags = tagFilter
    ? filteredByCategory.filter((post) => {
        if (Array.isArray(tagFilter)) {
          return tagFilter.some((tag) => post.tags.includes(tag))
        } else {
          return post.tags.includes(tagFilter)
        }
      })
    : filteredByCategory

  return (
    <>
      <Heading>{heading}</Heading>
      <div className='space-y-6'>
        <ul className='space-y-6'>
          {filteredByTags.length === 0 && 'No posts found.'}
          {filteredByTags.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, tags, content_type } = frontMatter
            return (
              <li key={slug} className='no-arrow group py-2'>
                <article className='flex flex-col gap-2'>
                  <div className='flex items-center gap-x-2'>
                    {date && (
                      <time
                        className='text-xs font-semibold uppercase text-gray-600 dark:text-gray-400'
                        dateTime={date}
                      >
                        {formatDateShort(date)}
                      </time>
                    )}{' '}
                    <span className='text-gray-700 dark:text-gray-400'>|</span>
                    {content_type && <Badge text={content_type} />}
                    <span className='text-gray-700 dark:text-gray-400'>|</span>
                    {tags && (
                      <div className='flex items-baseline gap-x-2'>
                        <Tags tags={tags} />
                      </div>
                    )}
                  </div>
                  <Link href={`/${slug}`} className='text-gray-900 dark:text-gray-200'>
                    <h3 className='text-2xl font-bold capitalize tracking-tight hover:cursor-pointer hover:underline'>
                      {title}
                    </h3>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        <div className='mt-2'>
          {filteredByTags.length > MAX_DISPLAY && <LinkArrow text='See All Posts' direction='right' href={`/posts`} />}
        </div>
      </div>
    </>
  )
}
