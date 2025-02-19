import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const MicrodoseIcon = () => {
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(null)

  useEffect(() => {
    setCurrentTheme(theme === 'system' ? resolvedTheme : theme)
  }, [theme, resolvedTheme])

  if (!currentTheme) {
    return null
  }

  return currentTheme === 'dark' ? (
    <svg width='32' height='32' viewBox='0 0 50 51' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M33.3963 39.0437C33.3963 43.6735 29.6252 47.4267 24.9734 47.4267C20.3216 47.4267 16.5505 43.6735 16.5505 39.0437C16.5505 34.4139 21.885 26.9349 24.9734 23.1626C27.8746 26.9349 33.3963 34.4139 33.3963 39.0437Z'
        fill='white'
      />
      <path
        d='M43.0108 22.8861C43.0108 33.4359 35.0267 22.8861 24.4854 22.8861C13.9441 22.8861 6.98926 33.4359 6.98926 22.8861C6.98926 12.3362 13.9441 5.57703 24.4854 5.57703C35.0267 5.57703 43.0108 12.3362 43.0108 22.8861Z'
        fill='#CDCCCC'
      />
    </svg>
  ) : (
    <svg width='32' height='32' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M33.3963 38.1261C33.3963 42.7559 29.6252 46.5091 24.9734 46.5091C20.3216 46.5091 16.5505 42.7559 16.5505 38.1261C16.5505 33.4963 21.885 26.0173 24.9734 22.245C27.8746 26.0173 33.3963 33.4963 33.3963 38.1261Z'
        fill='#353535'
      />
      <path
        d='M43.0108 21.9685C43.0108 32.5183 35.0267 21.9685 24.4854 21.9685C13.9441 21.9685 6.98926 32.5183 6.98926 21.9685C6.98926 11.4186 13.9441 4.65942 24.4854 4.65942C35.0267 4.65942 43.0108 11.4186 43.0108 21.9685Z'
        fill='black'
      />
    </svg>
  )
}

export default MicrodoseIcon
