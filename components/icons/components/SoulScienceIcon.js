import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const SoulScienceIcon = () => {
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(null)

  useEffect(() => {
    setCurrentTheme(theme === 'system' ? resolvedTheme : theme)
  }, [theme, resolvedTheme])

  if (!currentTheme) {
    return null
  }

  return currentTheme === 'dark' ? (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_276_123)'>
        <circle cx='16' cy='16' r='15' stroke='white' strokeWidth='0.75' />
        <circle cx='15.9674' cy='10.9457' r='9.94565' stroke='white' strokeWidth='0.5' />
        <circle cx='15.9674' cy='21.0544' r='9.94565' stroke='white' strokeWidth='0.5' />
        <line x1='7.45653' y1='15.75' x2='24.4783' y2='15.75' stroke='white' strokeWidth='0.5' />
        <line x1='7.23953' y1='15.8759' x2='15.783' y2='0.941082' stroke='white' strokeWidth='0.5' />
        <line x1='24.3262' y1='16.1237' x2='15.8109' y2='1.17305' stroke='white' strokeWidth='0.5' />
        <line x1='24.6838' y1='16.0578' x2='16.2176' y2='31.0364' stroke='white' strokeWidth='0.5' />
        <line x1='7.60812' y1='15.8756' x2='16.1887' y2='30.8262' stroke='white' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='16.0163' rx='4.8587' ry='4.8913' stroke='white' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='11.1413' rx='4.8587' ry='4.8913' stroke='white' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='20.8913' rx='4.8587' ry='4.8913' stroke='white' strokeWidth='0.5' />
      </g>
      <defs>
        <clipPath id='clip0_276_123'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_281_148)'>
        <circle cx='16' cy='16' r='15' stroke='#0D0F14' strokeWidth='0.75' />
        <circle cx='15.9674' cy='10.9457' r='9.94565' stroke='#0D0F14' strokeWidth='0.5' />
        <circle cx='15.9674' cy='21.0544' r='9.94565' stroke='#0D0F14' strokeWidth='0.5' />
        <line x1='7.45653' y1='15.75' x2='24.4783' y2='15.75' stroke='#0D0F14' strokeWidth='0.5' />
        <line x1='7.23953' y1='15.8759' x2='15.783' y2='0.941082' stroke='#0D0F14' strokeWidth='0.5' />
        <line x1='24.3262' y1='16.1237' x2='15.8109' y2='1.17305' stroke='#0D0F14' strokeWidth='0.5' />
        <line x1='24.6838' y1='16.0578' x2='16.2176' y2='31.0364' stroke='#0D0F14' strokeWidth='0.5' />
        <line x1='7.60812' y1='15.8756' x2='16.1887' y2='30.8262' stroke='#0D0F14' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='16.0163' rx='4.8587' ry='4.8913' stroke='#0D0F14' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='11.1413' rx='4.8587' ry='4.8913' stroke='#0D0F14' strokeWidth='0.5' />
        <ellipse cx='15.9837' cy='20.8913' rx='4.8587' ry='4.8913' stroke='#0D0F14' strokeWidth='0.5' />
      </g>
      <defs>
        <clipPath id='clip0_281_148'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SoulScienceIcon
