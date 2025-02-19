import React from 'react'

export default function Heading({ text, level = 'h2', border = 'border', color = 'gray-200', subtitle }) {
  const borderClasses = border === 'border' ? 'mb-8 border-b-2 border-gray-300 py-2 dark:border-gray-500 font-sans' : ''

  const HeadingLevels = {
    h1: ({ text }) => (
      <>
        {subtitle ? (
          <span className='font-sans font-bold text-2xl text-gray-700 dark:text-gray-300 mb-4'>{subtitle}</span>
        ) : null}
        <h1
          className={`text-5xl font-sans font-bold leading-none tracking-tighter text-gray-800 dark:text-gray-200 ${borderClasses}`}
        >
          {text}
        </h1>
      </>
    ),
    h2: ({ text }) => (
      <h2
        className={`font-sans text-4xl font-bold leading-none tracking-tighter text-gray-800 dark:text-gray-200 ${borderClasses}`}
      >
        {text}
      </h2>
    ),
    h3: ({ text }) => (
      <h3
        className={`font-sans text-3xl font-bold leading-none tracking-tighter text-gray-800 dark:text-gray-200 ${borderClasses}`}
      >
        {text}
      </h3>
    ),
  }

  const HeadingTag = HeadingLevels[level] || HeadingLevels.h2

  return text ? <HeadingTag text={text} /> : null
}
