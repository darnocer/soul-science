import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text, index }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} passHref>
      <span className='font-sans text-xs font-semibold uppercase leading-none tracking-wide text-primary-500  duration-100 ease-in hover:text-primary-600 dark:hover:text-primary-300'>
        #{text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
