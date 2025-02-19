import Tag from '@/components/links/Tag'

import Heading from '@/components/headings/Heading'

export default function HeaderTagList({ tags, heading }) {
  return (
    <>
      {heading ? <Heading text={heading} /> : null}
      {tags ? (
        <div className='flex flex-wrap justify-center'>
          {tags.length === 0 && null}
          {tags.map((tag, index) => (
            <div key={index} className='mr-1'>
              <Tag text={tag} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
