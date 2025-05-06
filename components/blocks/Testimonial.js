import React from 'react'
import Star from '@/components/icons/components/star.svg'

const Testimonial = ({ quote, author }) => {
  return (
    <div className='my-6 flex max-w-none justify-center'>
      <div className='relative w-full rounded-md border-l-4 border-accent-500 bg-gray-100 p-6 shadow-md dark:bg-gray-800'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='80'
          height='80'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='absolute left-4 top-4 text-accent-500 opacity-10'
          style={{ transform: 'translate(-10%, -10%)' }}
        >
          <path d='M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z' />
          <path d='M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z' />
        </svg>
        <div className='not-prose flex flex-col'>
          <div className='flex justify-end gap-2 text-accent-400'>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <p className='mb-4 mt-6 text-base font-semibold italic leading-normal text-gray-900 dark:text-gray-100'>
            {quote}
          </p>
          <hr className=' mb-2 mt-0 border-gray-300 dark:border-gray-700' />
          <p className='mb-0 text-right font-sans font-semibold leading-normal text-gray-700 dark:text-gray-300'>
            —{author}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
