import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Badge = ({ text }) => {
  if (!text) return null

  const formattedText = Array.isArray(text) ? text[0] : text // Handle array case
  const href = `/types/${kebabCase(formattedText)}`

  return (
    <Link href={href} passHref>
      <p
        // onClick={() => console.log('Navigating to:', href)}
        className='inline-flex leading-none items-center justify-center rounded-2xl bg-secondary-600 bg-opacity-80 px-2 pt-1 font-sans text-xxs font-semibold uppercase tracking-wide text-gray-100 duration-300 ease-in hover:cursor-pointer hover:bg-secondary-500 hover:bg-opacity-80 dark:bg-secondary-400 dark:bg-opacity-60 dark:text-gray-100 dark:hover:bg-secondary-200 dark:hover:bg-opacity-60'
      >
        {formattedText}
      </p>
    </Link>
  )
}

export default Badge
