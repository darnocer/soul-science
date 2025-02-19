import React from 'react'
import Image from 'next/image'
import Link from '@/components/links/Link'
import Heading from '@/components/headings/Heading'
import ExternalIcon from '@/components/icons/ui/external.svg'

import homeCardData from '@/data/cards/homeCardData'
import workCardData from '@/data/cards/workCardData'

const cardDataMap = {
  home: homeCardData,
  work: workCardData,
}

const CardGrid = ({ heading, type = 'work' }) => {
  const data = cardDataMap[type] || []

  return (
    <>
      <Heading level='h2' text={heading} />
      <div className='not-prose grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 sm:py-6 auto-rows-fr'>
        {data.map(({ title, link, icon, status }, index) => {
          const isDisabled = status === 'disabled'
          const isExternal = link.startsWith('http')

          return (
            <Link href={isDisabled ? '#' : link} key={index} className='exclude-underline'>
              <div
                className={`group ease-in-out relative flex flex-col justify-between rounded-md px-4 py-6 shadow-md transition-all duration-300 text-gray-850 hover:text-black dark:bg-black dark:hover:bg-gray-900 border-2 border-secondary-600/60 hover:border-secondary-500/40 dark:border-secondary-500/70 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:border-secondary-500 h-full
                ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
              >
                {isDisabled && (
                  <div className='absolute inset-0 flex items-center justify-center rounded-md dark:bg-black dark:bg-opacity-70 bg-gray-600 bg-opacity-50 text-accent-600 text-lg font-bold opacity-0 transition-opacity hover:opacity-100'>
                    Coming Soon
                  </div>
                )}
                {!isDisabled && isExternal && (
                  <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 duration-300 ease-in-out transition-opacity'>
                    <ExternalIcon />
                  </div>
                )}
                <div className='text-3xl mb-4'>
                  {React.isValidElement(icon) ? (
                    icon
                  ) : icon.startsWith('/') ? (
                    <Image src={icon} alt={title} width={32} height={32} />
                  ) : (
                    <span>{icon}</span>
                  )}
                </div>
                <h3 className='text-base font-sans font-bold'>{title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default CardGrid
