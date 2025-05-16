import Link from '@/components/links/Link'
import Tags from '@/components/links/Tags'
import kebabCase from '@/lib/utils/kebabCase'

import Heading from '@/components/headings/Heading'
import SectionContainer from '@/components/layout/SectionContainer'

export default function TagList({ tags, heading, level = 'h2' }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <SectionContainer>
      {heading ? <Heading level={level}>{heading}</Heading> : null}
      <div className='mb-6 flex flex-wrap justify-start'>
        <span className='font-semibold  text-gray-500 dark:text-gray-400'>
          {Object.keys(tags).length === 0 && 'No tags found.'}
        </span>
        <Tags tags={sortedTags} align='center' />
      </div>
    </SectionContainer>
  )
}
