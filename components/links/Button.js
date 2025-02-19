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

const Button = ({ action, text, link }) => {
  const IconComponent = action && ICONS[action]

  return (
    <Link
      href={link}
      className='exclude-underline ease hover:pointer mb-4 sm:mb-0 mr-6 inline-flex items-center justify-center gap-2 rounded-md
                 px-6 py-3 border 
       border-gray-700 dark:border-gray-300/30
                 bg-white dark:bg-black  
                 text-sm font-semibold transition-all duration-200 hover:border-gray-500
                 dark:hover:border-gray-400/40 hover:bg-gray-100
                 dark:hover:bg-gray-850 shadow-lg hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:no-underline'
    >
      {IconComponent && <div className='text-base text-gray-800 dark:text-gray-100'>{IconComponent}</div>}
      <span className='mt-1 text-sm font-sans uppercase font-semibold text-gray-800 dark:text-gray-100'>{text}</span>
    </Link>
  )
}

export default Button
