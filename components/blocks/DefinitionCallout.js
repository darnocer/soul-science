import React from 'react'

const DefinitionCallout = ({ word, definition }) => {
  return (
    <div className='not-prose m-8 max-w-none rounded-md border-l-4 border-primary-500 bg-gray-100 p-4 shadow-md dark:bg-gray-800'>
      <div className='flex flex-col'>
        <h3 className='mb-2 text-xl font-semibold  text-gray-900 dark:text-gray-100'>{word}</h3>
        <hr className='mb-4 border-gray-300 dark:border-gray-700' />
        <p className=' mb-2 text-sm leading-normal text-gray-700 dark:text-gray-300'>{definition}</p>
      </div>
    </div>
  )
}

export default DefinitionCallout
