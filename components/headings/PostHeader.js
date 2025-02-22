import PageTitle from '@/components/headings/PageTitle'
import formatDate from '@/lib/utils/formatDate'
import Badge from '@/components/links/Badge'
import Breadcrumbs from '@/components/links/Breadcrumbs'

export default function PostHeader({ title, summary, date }) {
  return (
    <>
      <div className='flex flex-col gap-y-4 border-b border-gray-200 pb-8 dark:border-gray-700'>
        <div className='text-left'>
          <Breadcrumbs />
        </div>

        <div className='flex items-center justify-center gap-x-2'>
          {date ? (
            <dl>
              <div>
                <dt className='sr-only'>Published on</dt>
                <dd className='text-xs font-medium uppercase leading-6 text-gray-700 dark:text-gray-500'>
                  <time dateTime={date}>{formatDate(date)}</time>
                </dd>
              </div>
            </dl>
          ) : null}
        </div>
        <PageTitle>{title}</PageTitle>
        <p className='mt-4 text-center font-serif text-base italic text-gray-700 dark:text-gray-500'>{summary}</p>
      </div>
    </>
  )
}
