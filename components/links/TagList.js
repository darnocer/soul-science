import Link from '@/components/links/Link'
import Tag from '@/components/links/Tag'
import kebabCase from '@/lib/utils/kebabCase'

import Heading from '@/components/headings/Heading'
import SectionContainer from '@/components/layout/SectionContainer'

export default function TagList({ tags, heading, level = 'h2', border = 'border', color = 'gray-200' }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      {heading ? <Heading text={heading} level={level} border={border} color={color} /> : null}
      <div className='mb-6 flex flex-wrap justify-start'>
        <span className='font-semibold text-gray-500 dark:text-gray-400'>
          {' '}
          {Object.keys(tags).length === 0 && 'No tags found.'}
        </span>
        {sortedTags.map((t) => {
          return (
            <div key={t} className='mt-2 mb-2 mr-4'>
              <Tag text={t} index={tags[t]} />
            </div>
          )
        })}
      </div>
    </>
  )
}
