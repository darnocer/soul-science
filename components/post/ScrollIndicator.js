'use client'

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ScrollIndicator = ({ direction = 'top' }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const updateScrollPercentage = () => {
      const scrollPosition = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight || 1
      setScrollPercentage((scrollPosition / documentHeight) * 100)
    }

    window.addEventListener('scroll', updateScrollPercentage)
    return () => {
      window.removeEventListener('scroll', updateScrollPercentage)
    }
  }, [])

  const THICKNESS = '10px'
  const COLORS = 'from-tertiary-300 to-primary-700'

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
