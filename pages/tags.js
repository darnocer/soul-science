import { getAllTags } from '@/lib/getAllTags'

import PageTitle from '@/components/headings/PageTitle'
import TagList from '@/components/links/TagList'

import pageContent from '@/data/pageContent'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

const PAGE_TITLE = 'Tags'

export async function getStaticProps() {
  const tags = await getAllTags()

  return { props: { tags } }
}

export default function Tags({ tags }) {
  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 border-gray-500 pb-8 pt-6 dark:border-gray-700 md:space-y-5 md:border-r-2 md:px-6'>
          <PageTitle>{pageContent.tags.title}</PageTitle>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          <TagList tags={tags} />
        </div>
      </div>
    </MetadataWrapper>
  )
}
