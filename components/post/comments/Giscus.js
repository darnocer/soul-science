import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)

    const { repo, repositoryId, category, categoryId, mapping, reactions, metadata, inputPosition, lang } =
      siteMetadata?.comment?.giscusConfig

    if (typeof document !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://utteranc.es/client.js'
      script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
      script.setAttribute('issue-term', siteMetadata.comment.utterancesConfig.issueTerm)
      script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
      script.setAttribute('theme', commentsTheme)
      script.setAttribute('crossorigin', 'anonymous')
      script.async = true

      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.appendChild(script)
    }

    return () => {
      if (typeof document !== 'undefined') {
        const comments = document.getElementById(COMMENTS_ID)
        if (comments && comments.hasChildNodes()) {
          comments.innerHTML = ''
        }
      }
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const iframe = document.querySelector('iframe.giscus-frame')
      if (!iframe) return
      LoadComments()
    }
  }, [LoadComments])

  return (
    <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>}
      <div className='giscus' id={COMMENTS_ID} />
    </div>
  )
}

export default Giscus
