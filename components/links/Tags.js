import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tags = ({ tags, align }) => {
  if (!tags || tags.length === 0) return null

  const alignment = align === 'center' ? 'text-center' : ''

  return (
    <div className={`w-full text-xs font-semibold uppercase leading-none tracking-wide ${alignment}`}>
      {tags.map((text, index) => (
        <span key={text} className='inline'>
          <Link href={`/tags/${kebabCase(text)}`} passHref>
            <span className='font-sans leading-6 text-tertiary-500 duration-100 ease-in hover:text-tertiary-600 dark:hover:text-tertiary-300'>
              #{text.split(' ').join('-')}
            </span>
          </Link>
          {index < tags.length - 1 && <span className='text-gray-500 dark:text-gray-400'> ∙ </span>}
        </span>
      ))}
    </div>
  )
}

export default Tags
