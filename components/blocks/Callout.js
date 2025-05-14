'use client'

import { Star, Info, Construction, Wrench, Quote as QuoteIcon } from 'lucide-react'
import parse from 'html-react-parser'

const Callout = ({ type = 'info', title = 'Summary', text, children }) => {
  const iconSize = 28

  const icons = {
    construction: <Construction size={iconSize} />,
    quote: <QuoteIcon size={iconSize} />,
    tools: <Wrench size={iconSize} />,
    info: <Info size={iconSize} />,
    default: <Star size={iconSize} />,
  }

  const icon = icons[type] || icons.default
  const isQuote = type === 'quote'

  return (
    <div className='callout not-prose mb-8 mt-8 flex overflow-hidden rounded-md border-2 border-accent-700 bg-white font-sans shadow-lg dark:border-accent-400 dark:bg-black dark:text-gray-200'>
      <div className='flex w-12 shrink-0 items-start justify-center bg-accent-700 p-2 dark:bg-accent-300'>
        <div className='mt-2 text-white dark:text-black'>{icon}</div>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <p className={`text-lg font-bold ${isQuote ? 'italic' : ''}`}>{title}</p>
        {text && (
          <div
            className={`font-semibold ${
              isQuote ? 'text-right text-gray-700 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {parse(text)}
          </div>
        )}
        {children && (
          <div
            className={`font-semibold ${
              isQuote ? 'text-right text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-gray-200'
            }`}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Callout
