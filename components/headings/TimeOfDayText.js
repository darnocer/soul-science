import { useEffect, useState } from 'react'

export default function TimeOfDayText() {
  const [timeText, setTimeText] = useState('')

  useEffect(() => {
    const getTimeOfDayText = () => {
      const now = new Date()
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now)
      const hour = now.getHours()

      let timeOfDay
      if (hour < 12) {
        timeOfDay = 'morning'
      } else if (hour < 18) {
        timeOfDay = 'afternoon'
      } else {
        timeOfDay = 'evening'
      }

      setTimeText(`${dayOfWeek} ${timeOfDay}`)
    }

    getTimeOfDayText()
  }, [])

  return <span>{timeText}</span>
}
