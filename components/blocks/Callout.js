import { Star, Info, Construction, Wrench, Quote } from 'lucide-react'
import parse from 'html-react-parser'

const Callout = ({ type = 'info', text, title = 'Summary' }) => {
  const iconSize = 20
  const icons = {
    construction: <Construction size={iconSize} />,
    quote: <Quote size={iconSize} />,
    tools: <Wrench size={iconSize} />,
    info: <Info size={iconSize} />,
    default: <Star size={iconSize} />,
  }
  const icon = icons[type] || icons.default

  const formatText = (inputText) => parse(inputText.replace(/`([^`]+)`/g, "<code className='inline-code'>$1</code>"))

  return (
    <div className='callout not-prose mt-8 mb-8 rounded-md border-2 border-secondary-500 text-secondary-600 dark:border-secondary-400 dark:bg-black dark:text-secondary-400 bg-white p-4 shadow-lg font-sans'>
      <div className='flex items-center'>
        <div className='mr-2'>{icon}</div>
        <p className='text-md mt-1 font-bold'>{title}</p>
      </div>
      {text && <div className='mt-2 font-semibold text-gray-700 dark:text-gray-300'>{formatText(text)}</div>}
    </div>
  )
}

export default Callout
