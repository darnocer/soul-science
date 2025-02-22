import Badge from '@/components/links/Badge'
import kebabCase from '@/lib/utils/kebabCase'

import Heading from '@/components/headings/Heading'

export default function BadgeList({ types, heading, level = 'h2' }) {
  const sortedTypes = Object.keys(types).sort((a, b) => types[b] - types[a])

  return (
    <>
      {heading ? <Heading level={level}>{heading}</Heading> : null}
      <div className='mb-6 flex flex-wrap justify-start'>
        <span className='font-semibold text-gray-500 dark:text-gray-400'>
          {Object.keys(types).length === 0 && 'No types found.'}
        </span>
        {sortedTypes.map((t) => {
          // Convert hyphenated keys back to a readable form
          const displayText = t.replace(/-/g, ' ')
          return (
            <div key={t} className='mb-2 mr-4 mt-2'>
              <Badge text={displayText} />
            </div>
          )
        })}
      </div>
    </>
  )
}
