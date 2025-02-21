'use client'

import React from 'react'
import Link from '@/components/links/Link'

const Button = ({ text, link, onClick, type = 'primary' }) => {
  const commonClasses = `exclude-underline ease hover:pointer mb-4 inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 shadow-md transition-all duration-200 hover:no-underline sm:mb-0`

  const secondaryClasses = `bg-white border-gray-700 hover:border-gray-500 hover:bg-gray-100 dark:border-gray-300/30 dark:bg-black dark:hover:border-gray-400/40 dark:hover:bg-gray-850`

  const primaryClasses = `bg-primary-500 border-primary-600 text-white hover:border-primary-500 hover:bg-primary-400 dark:bg-primary-800 dark:border-primary-600 dark:hover:bg-primary-700 dark:hover:border-primary-600`

  const buttonClasses = `${commonClasses} ${type === 'secondary' ? secondaryClasses : primaryClasses}`

  const spanClasses = `mt-1 font-sans text-xs font-semibold uppercase`

  if (link) {
    return (
      <Link href={link} className={buttonClasses}>
        <span className={spanClasses}>{text}</span>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={spanClasses}>{text}</span>
    </button>
  )
}

export default Button
