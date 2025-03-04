import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ScrollIndicator = ({ direction = 'left' }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollPosition = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercent = (scrollPosition / documentHeight) * 100
      setScrollPercentage(scrollPercent)
    }

    window.addEventListener('scroll', updateScrollPercentage)
    return () => window.removeEventListener('scroll', updateScrollPercentage)
  }, [])

  const THICKNESS = '10px'
  const COLORS = 'from-accent-400 to-accent-700'

  const isHorizontal = direction === 'top'

  return (
    <div
      className={`fixed z-50 transition-all ${isHorizontal ? 'bg-gradient-to-r' : 'bg-gradient-to-b'} ${COLORS}`}
      style={{
        top: 0,
        left: 0,
        height: isHorizontal ? THICKNESS : `${scrollPercentage}%`,
        width: isHorizontal ? `${scrollPercentage}%` : THICKNESS,
      }}
    ></div>
  )
}

ScrollIndicator.propTypes = {
  direction: PropTypes.oneOf(['top', 'left']),
}

export default ScrollIndicator
