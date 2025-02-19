import PageTitle from '@/components/headings/PageTitle'
import HeaderTagList from '@/components/links/HeaderTagList'
import formatDate from '@/lib/utils/formatDate'
import Badge from '@/components/links/Badge'
import Breadcrumbs from '@/components/links/Breadcrumbs'

export default function PostHeaderSimple({ title, summary, tags, date, contentType }) {
  return (
    <>
      <div className='flex flex-col gap-y-4 border-b border-gray-200 pb-8 text-center dark:border-gray-700'>
        <Breadcrumbs />
        <div className='flex justify-center items-center gap-x-2'>
          {date ? (
            <dl>
              <div>
                <dt className='sr-only'>Published on</dt>
                <dd className='text-xs font-medium uppercase leading-6 text-gray-700 dark:text-gray-400'>
                  <time dateTime={date}>{formatDate(date)}</time>
                </dd>
              </div>
            </dl>
          ) : null}
          <span>|</span>
          {contentType ? <Badge text={contentType} /> : null}
        </div>

        <PageTitle>{title}</PageTitle>

        {/* <HeaderTagList tags={tags} /> */}

        {/* <div className="m-4">
        <p className="italic">{summary}</p>
      </div> */}
      </div>
    </>
  )
}
