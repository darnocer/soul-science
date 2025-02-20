import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

const Utterances = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const [commentsLoaded, setCommentsLoaded] = useState(false) // Track if script is loaded
  const { theme, resolvedTheme } = useTheme()

  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    if (commentsLoaded) return // Prevent duplicate script loading

    setEnabledLoadComments(false)

    if (typeof document !== 'undefined') {
      if (!document.getElementById('utterances-script')) {
        const script = document.createElement('script')
        script.id = 'utterances-script'
        script.src = 'https://utteranc.es/client.js'
        script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
        script.setAttribute('issue-term', siteMetadata.comment.utterancesConfig.issueTerm)
        script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
        script.setAttribute('theme', commentsTheme)
        script.setAttribute('crossorigin', 'anonymous')
        script.async = true

        const comments = document.getElementById(COMMENTS_ID)
        if (comments) comments.appendChild(script)

        setCommentsLoaded(true) // Mark script as loaded
      }
    }
  }, [commentsLoaded, commentsTheme])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const iframe = document.querySelector('iframe.utterances-frame')
      if (!iframe) LoadComments() // Only load if not already present
    }
  }, [LoadComments])

  return (
    <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className='utterances-frame relative' id={COMMENTS_ID} />
    </div>
  )
}

export default Utterances
