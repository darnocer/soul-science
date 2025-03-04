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
    <div className='callout not-prose mb-8 mt-8 rounded-md border-2 border-accent-700 bg-white p-4 font-sans text-accent-700 shadow-lg dark:border-accent-400 dark:bg-black dark:text-accent-400'>
      <div className='flex items-center'>
        <div className='mr-2'>{icon}</div>
        <p className='text-md mt-1 font-bold'>{title}</p>
      </div>
      {text && <div className='mt-2 font-semibold text-gray-700 dark:text-gray-300'>{formatText(text)}</div>}
    </div>
  )
}

export default Callout
