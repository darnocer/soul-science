import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const [commentsLoaded, setCommentsLoaded] = useState(false) // Track if script is loaded
  const { theme, resolvedTheme } = useTheme()

  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback(() => {
    if (commentsLoaded) return // Prevent duplicate script loading

    setEnabledLoadComments(false)

    const { repo, repositoryId, category, categoryId, mapping, reactions, metadata, inputPosition, lang } =
      siteMetadata?.comment?.giscusConfig

    if (typeof document !== 'undefined') {
      if (!document.getElementById('giscus-script')) {
        const script = document.createElement('script')
        script.id = 'giscus-script'
        script.src = 'https://giscus.app/client.js'
        script.setAttribute('data-repo', repo)
        script.setAttribute('data-repo-id', repositoryId)
        script.setAttribute('data-category', category)
        script.setAttribute('data-category-id', categoryId)
        script.setAttribute('data-mapping', mapping)
        script.setAttribute('data-reactions-enabled', reactions)
        script.setAttribute('data-emit-metadata', metadata)
        script.setAttribute('data-input-position', inputPosition)
        script.setAttribute('data-lang', lang)
        script.setAttribute('data-theme', commentsTheme)
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
      const iframe = document.querySelector('iframe.giscus-frame')
      if (!iframe) LoadComments() // Only load if not already present
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
