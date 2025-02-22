import React from 'react'
import Image from 'next/image'
import Link from '@/components/links/Link'
import Heading from '@/components/headings/Heading'
import ExternalIcon from '@/components/icons/ui/external.svg'

import homeCardData from '@/data/cards/homeCardData'

const workCardData = ''

const cardDataMap = {
  home: homeCardData,
  work: workCardData,
}

const CardGrid = ({ heading, type = 'work' }) => {
  const data = cardDataMap[type] || []

  return (
    <>
      <Heading>{heading}</Heading>
      <div className='not-prose grid auto-rows-fr grid-cols-1 gap-4 py-4 sm:grid-cols-2 sm:py-6 md:grid-cols-3 lg:grid-cols-4'>
        {data.map(({ title, link, icon, status }, index) => {
          const isDisabled = status === 'disabled'
          const isExternal = link.startsWith('http')

          return (
            <Link href={isDisabled ? '#' : link} key={index} className='exclude-underline'>
              <div
                className={`group relative flex h-full flex-col justify-between rounded-md border-2 border-secondary-600/60 px-4 py-6 text-gray-850 shadow-md transition-all duration-300 ease-in-out hover:border-secondary-500/40 hover:text-black dark:border-secondary-500/70 dark:bg-black dark:text-gray-200 dark:hover:border-secondary-500 dark:hover:bg-gray-900 dark:hover:text-gray-100
                ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
              >
                {isDisabled && (
                  <div className='absolute inset-0 flex items-center justify-center rounded-md bg-gray-600 bg-opacity-50 text-lg font-bold text-accent-600 opacity-0 transition-opacity hover:opacity-100 dark:bg-black dark:bg-opacity-70'>
                    Coming Soon
                  </div>
                )}
                {!isDisabled && isExternal && (
                  <div className='absolute right-2 top-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                    <ExternalIcon />
                  </div>
                )}
                <div className='mb-4 text-3xl'>
                  {React.isValidElement(icon) ? (
                    icon
                  ) : icon.startsWith('/') ? (
                    <Image src={icon} alt={title} width={32} height={32} />
                  ) : (
                    <span>{icon}</span>
                  )}
                </div>
                <h3 className='font-sans text-base font-bold'>{title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default CardGrid
