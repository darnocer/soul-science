import { useRef, useState } from 'react'
import Lottie from 'lottie-react'
import confettiAnimation from '@/data/lottie/confetti.json'
import siteMetadata from '@/data/siteMetadata'
import SectionContainer from '@/components/layout/SectionContainer'

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
      <div className='relative flex items-center justify-center'>
        {subscribed && (
          <div className='absolute left-[75%] top-[50%] w-64 -translate-x-1/2 -translate-y-1/2'>
            <Lottie animationData={confettiAnimation} autoplay loop={false} />
          </div>
        )}

        <div className='justify-content flex flex-col items-start'>
          {title && <h3 className='pb-1 text-lg font-semibold text-gray-800 dark:text-gray-200'>{title}</h3>}
          {description && <p className='mb-4 mt-2 text-xs font-medium text-gray-400'>{description}</p>}

          <form className='flex max-w-md flex-col sm:flex-row' onSubmit={subscribe}>
            <div>
              <label htmlFor='email-input'>
                <span className='sr-only'>Email address</span>
                <input
                  autoComplete='email'
                  className='w-72 rounded-md px-4 text-sm font-medium focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black'
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
            <div className='mt-2 flex rounded-md shadow-sm sm:ml-3 sm:mt-0'>
              <button
                className={`exclude-underline ease hover:pointer  mb-4 mr-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border   px-6 py-4 text-sm font-semibold uppercase  shadow-md transition-all duration-200 hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2  dark:ring-offset-black sm:mb-0 sm:py-0  ${
                  subscribed
                    ? 'cursor-not-allowed border-gray-600 bg-gray-600/60 text-gray-800 dark:border-gray-600 dark:text-white'
                    : 'border-primary-600  bg-primary-500 text-white hover:border-primary-500  hover:bg-primary-400 dark:bg-primary-500 dark:text-white dark:hover:border-primary-600 dark:hover:bg-primary-600'
                } `}
                type='submit'
                disabled={subscribed}
              >
                {subscribed ? 'THANK YOU!' : content.button}
              </button>
            </div>
          </form>

          {!subscribed && (
            <div className='mt-3 flex items-center space-x-2'>
              <input
                type='checkbox'
                id='consent-checkbox'
                onChange={(e) => setConsent(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black'
                required
              />
              <label htmlFor='consent-checkbox' className='text-xs font-medium text-gray-600 dark:text-gray-300'>
                {content.consent}
              </label>
            </div>
          )}

          {disclaimer && <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>{disclaimer}</p>}

          {error && <div className='w-72 pt-2 text-sm text-accent-500 dark:text-accent-500 sm:w-96'>{message}</div>}

          {subscribed && <p className='mt-3 text-sm font-medium text-green-600 dark:text-green-400'>{message}</p>}
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
