import Author from '@/components/post/Author'
import Tags from '@/components/links/Tags'
import LinkArrow from '@/components/links/LinkArrow'
import Badge from '@/components/links/Badge'
import formatDate from '@/lib/utils/formatDate'

const BlogSidebar = ({ author, tags, next, prev, type, date }) => {
  return (
    <aside className='mt-6 rounded-md border border-gray-900 bg-white px-4 py-4 dark:border-gray-700 dark:bg-black xl:sticky xl:top-24 xl:col-start-4 xl:row-span-2 xl:max-h-max'>
      <div className='divide-y divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700'>
        {date ? (
          <dl>
            <div className='py-4'>
              <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Published:</span>
              <dt className='sr-only'>Published on</dt>
              <dd className='mt-2 text-xs font-medium leading-6 text-gray-700 dark:text-gray-300'>
                <time dateTime={date}>{formatDate(date)}</time>
              </dd>
            </div>
          </dl>
        ) : null}

        {author && (
          <div className='py-4'>
            <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Author:</span>
            <div className='mt-4'>
              <Author author={author} />
            </div>
          </div>
        )}

        {type && (
          <div className='py-4'>
            <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Category: </span>
            <div className='mt-2 flex flex-wrap gap-y-2'>
              <Badge text={type} />
            </div>
          </div>
        )}

        {tags && (
          <div className='py-4'>
            <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Tags:</span>
            <div className='mt-2 flex flex-wrap gap-y-2'>
              <Tags tags={tags} />
            </div>
          </div>
        )}

        {(next || prev) && (
          <div className='py-4'>
            {next && (
              <div className='pb-4 xl:border-b xl:border-gray-200 xl:dark:border-gray-700'>
                <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Previous Post:</span>
                <div className='font-semibold capitalize text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                  <LinkArrow direction='left' href={`/${next.slug}`} text={next.title} />
                </div>
              </div>
            )}
            {prev && (
              <div className='pt-2'>
                <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Next Post:</span>
                <div className='capitalize text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                  <LinkArrow direction='right' href={`/${prev.slug}`} text={prev.title} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

export default BlogSidebar
