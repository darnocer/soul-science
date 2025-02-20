import React from 'react'
import Link from '@/components/links/Link'

import Download from '@/components/icons/buttons/download.svg'
import Contact from '@/components/icons/buttons/paper-plane.svg'
import Calendar from '@/components/icons/buttons/calendar.svg'

const ICONS = {
  download: <Download />,
  contact: <Contact />,
  schedule: <Calendar />,
}

const CtaButton = ({ action, text, link }) => {
  const IconComponent = action && ICONS[action]

  return (
    <Link
      href={link}
      className='exclude-underline ease hover:pointer mb-4 mr-6 inline-flex items-center justify-center gap-2 rounded-md border
                 border-gray-700 bg-white px-6 
       py-3 text-sm
                 font-semibold shadow-lg  
                 transition-all duration-200 hover:border-gray-500 hover:bg-gray-100 hover:no-underline
                 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] dark:border-gray-300/30
                 dark:bg-black dark:hover:border-gray-400/40 dark:hover:bg-gray-850 sm:mb-0'
    >
      {IconComponent && <div className='text-base text-gray-800 dark:text-gray-100'>{IconComponent}</div>}
      <span className='mt-1 font-sans text-sm font-semibold uppercase text-gray-800 dark:text-gray-100'>{text}</span>
    </Link>
  )
}

export default CtaButton
