import { getAllTypes } from '@/lib/getAllTypes'

import pageContent from '@/data/pageContent'

import PageTitle from '@/components/headings/PageTitle'
import BadgeList from '@/components/links/BadgeList'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

const PAGE_TITLE = 'Types'

export async function getStaticProps() {
  const types = await getAllTypes()

  return { props: { types } }
}

export default function Types({ types }) {
  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 border-gray-500 pb-8 pt-6 dark:border-gray-700 md:space-y-5 md:border-r-2 md:px-6'>
          <PageTitle>{pageContent.types.title}</PageTitle>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          <BadgeList types={types} />
        </div>
      </div>
    </MetadataWrapper>
  )
}
