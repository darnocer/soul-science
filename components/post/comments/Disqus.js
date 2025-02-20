import React, { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

const Disqus = ({ frontMatter }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const [disqusLoaded, setDisqusLoaded] = useState(false) // Track if Disqus is already loaded

  const COMMENTS_ID = 'disqus_thread'

  useEffect(() => {
    if (!disqusLoaded && typeof window !== 'undefined' && typeof document !== 'undefined') {
      window.disqus_config = function () {
        this.page.url = window.location.href
        this.page.identifier = frontMatter.slug
      }

      if (!document.getElementById('disqus-script')) {
        const script = document.createElement('script')
        script.id = 'disqus-script'
        script.src = `https://${siteMetadata.comment.disqusConfig.shortname}.disqus.com/embed.js`
        script.setAttribute('data-timestamp', +new Date())
        script.setAttribute('crossorigin', 'anonymous')
        script.async = true
        document.body.appendChild(script)

        setDisqusLoaded(true) // Mark as loaded
      }
    }
  }, [disqusLoaded, frontMatter.slug])

  return (
    <div className='pb-6 pt-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && (
        <button
          onClick={() => {
            setEnabledLoadComments(false)
            setDisqusLoaded(true) // Ensure Disqus loads once
          }}
        >
          Load Comments
        </button>
      )}
      <div className='disqus-frame' id={COMMENTS_ID} />
    </div>
  )
}

export default Disqus
