import React from 'react'
import Link from '@/components/links/Link'
import ChevronLeft from '@/components/icons/ui/ChevronLeftIcon'
import ChevronRight from '@/components/icons/ui/ChevronRightIcon'

export default function LinkArrow({ text, direction = 'left', href }) {
  return (
    <Link href={href}>
      <div className='my-4 inline-block font-sans text-base font-semibold leading-6 text-primary-500 duration-300 ease-in hover:text-primary-600 hover:underline dark:hover:text-primary-400'>
        {direction === 'left' && <ChevronLeft className='mr-1 inline h-4 w-4 align-middle' />}
        <span className='inline'>{text}</span>
        {direction === 'right' && <ChevronRight className='ml-1 inline h-4 w-4 align-middle' />}
      </div>
    </Link>
  )
}
