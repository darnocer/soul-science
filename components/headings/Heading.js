import React from 'react'

export default function Heading({ children, level = 'h2', border = true, description }) {
  const borderClasses = border ? 'mb-8 border-b-2 border-gray-300 py-2 dark:border-gray-500' : ''

  const baseClasses = 'font-sans font-extrabold leading-none tracking-tighter text-gray-800 dark:text-gray-200'

  const sizeClasses = {
    h1: 'text-5xl',
    h2: 'text-4xl',
    h3: 'text-3xl',
  }

  const HeadingTag = level in sizeClasses ? level : 'h2'

  return (
    <div className={borderClasses}>
      <HeadingTag className={`${baseClasses} ${sizeClasses[HeadingTag]}`}>{children}</HeadingTag>
      <p className='mb-2 mt-4 text-sm italic text-gray-500 dark:text-gray-400'>{description}</p>
    </div>
  )
}
