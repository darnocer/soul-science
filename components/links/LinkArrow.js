import React, { Component } from 'react'
import Link from '@/components/links/Link'
import ChevronLeft from '@/components/icons/ui/ChevronLeftIcon'
import ChevronRight from '@/components/icons/ui/ChevronRightIcon'

export default function LinkArrow({ text, direction, href }) {
  return (
    <Link href={href}>
      <div className='my-4 flex justify-start text-base font-semibold leading-6'>
        <span className='flex items-center text-primary-500 duration-300 ease-in font-sans hover:text-primary-600 hover:underline dark:hover:text-primary-400'>
          {direction === 'left' && <ChevronLeft className='mr-1' />}

          {text}

          {direction === 'right' && <ChevronRight className='ml-1' />}
        </span>
      </div>
    </Link>
  )
}
