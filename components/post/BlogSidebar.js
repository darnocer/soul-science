import Author from '@/components/post/Author'
import Tag from '@/components/links/Tag'
import LinkArrow from '@/components/links/LinkArrow'

const BlogSidebar = ({ author, tags, next, prev }) => {
  return (
    <aside className='mt-6 rounded-md border bg-white p-4 dark:border-gray-700 dark:bg-black xl:sticky xl:top-24 xl:col-start-4 xl:row-span-2 xl:max-h-max'>
      {author && (
        <div className='pb-2 pt-2 xl:border-b xl:border-gray-200 xl:dark:border-gray-700'>
          <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Author:</span>
          <div className='my-4 space-y-4'>
            <Author author={author} />
          </div>
        </div>
      )}
      <div className='divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:divide-y'>
        {tags && (
          <div className='py-4 xl:py-8'>
            <h2 className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Tags:</h2>
            <div className='mt-2 flex flex-wrap gap-y-2'>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
        )}
        {(next || prev) && (
          <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8 '>
            {prev && (
              <div className=''>
                <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>Next Article:</span>
                <div className='mt-2 font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                  <LinkArrow direction='right' href={`/${prev.slug}`} text={prev.title} />
                </div>
              </div>
            )}
            {next && (
              <div>
                <span className='text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400'>
                  Previous Article:
                </span>
                <div className='mt-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                  <LinkArrow direction='left' href={`/${next.slug}`} text={next.title} />
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
