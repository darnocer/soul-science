import { useRef, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import SectionContainer from '@/components/layout/SectionContainer'
import Button from '@/components/links/Button'

import pageContent from '@/data/pageContent'

const content = pageContent.newsletter

const NewsletterForm = ({ title, description, disclaimer }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [consent, setConsent] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    if (!consent) {
      setError(true)
      setMessage(content.termsError)
      return
    }

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage(content.emailError)
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage(content.success)
  }

  return (
    <SectionContainer padding='small'>
      <div className='flex items-center justify-center'>
        <div className='justify-content flex flex-col items-start'>
          {title ? <h3 className='pb-1 text-lg font-semibold text-gray-800 dark:text-gray-200'>{title}</h3> : null}
          {description ? <p className='mb-4 mt-2 text-xs font-medium text-gray-400'>{description}</p> : null}
          <form className='flex max-w-md flex-col sm:flex-row' onSubmit={subscribe}>
            <div>
              <label htmlFor='email-input'>
                <span className='sr-only'>Email address</span>
                <input
                  autoComplete='email'
                  className='w-72 rounded-md px-4 text-sm font-medium focus:border-transparent focus:outline-none focus:ring-2 focus:ring-tertiary-600 dark:bg-black'
                  id='email-input'
                  name='email'
                  placeholder={subscribed ? content.placeholderSubscribed : content.placeholder}
                  ref={inputEl}
                  required
                  type='email'
                  disabled={subscribed}
                />
              </label>
            </div>
            <div className='mt-2 flex  rounded-md shadow-sm sm:ml-3 sm:mt-0'>
              <button
                className={`exclude-underline ease hover:pointer dark:bg-tertiary-800 dark:hover:bg-tertiary-700 mb-4 mr-6 inline-flex items-center  justify-center gap-2 whitespace-nowrap rounded-md border border-tertiary-600 bg-tertiary-500 px-6 py-4 text-sm font-semibold uppercase text-white shadow-md transition-all duration-200 hover:border-tertiary-500 hover:bg-tertiary-400 hover:no-underline focus:outline-none focus:ring-2 focus:ring-tertiary-600 focus:ring-offset-2  dark:border-tertiary-600 dark:ring-offset-black dark:hover:border-tertiary-600 sm:mb-0 sm:py-0`}
                type='submit'
                disabled={subscribed}
              >
                {subscribed ? content.buttonSubscribed : content.button}
              </button>
            </div>
          </form>

          {!subscribed && (
            <div className='mt-3 flex items-center space-x-2'>
              <input
                type='checkbox'
                id='consent-checkbox'
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-tertiary-600 focus:ring-tertiary-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black'
                required
              />
              <label htmlFor='consent-checkbox' className='text-xs font-medium text-gray-600 dark:text-gray-300'>
                {content.consent}
              </label>
            </div>
          )}

          {disclaimer && <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>{disclaimer}</p>}

          {error && <div className='w-72 pt-2 text-sm text-accent-500 dark:text-accent-500 sm:w-96'>{message}</div>}
        </div>
      </div>
    </SectionContainer>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title, description, disclaimer }) => (
  <div className='flex items-center justify-center'>
    <div className='rounded-md bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8'>
      <NewsletterForm title={title} description={description} disclaimer={disclaimer} />
    </div>
  </div>
)
