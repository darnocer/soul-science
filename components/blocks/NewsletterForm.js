'use client'

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

    if (!consent) {
      setError(true)
      setMessage(content.termsError)
      return // Stop execution if consent is not checked
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
    <div className='relative flex items-center justify-center'>
      {subscribed && (
        <div className='absolute left-[75%] top-[50%] w-64 -translate-x-1/2 -translate-y-1/2'>
          <Lottie animationData={confettiAnimation} autoplay loop={false} />
        </div>
      )}

      <div className='justify-content flex flex-col items-start'>
        {title && <h3 className='pb-1 text-xl font-bold text-gray-800 dark:text-gray-200'>{title}</h3>}
        {description && <p className='mb-4 mt-2 text-sm font-medium text-gray-500'>{description}</p>}

        <form className='flex max-w-md flex-col flex-wrap sm:flex-nowrap' onSubmit={subscribe}>
          <div className='flex flex-col md:flex-row'>
            <label htmlFor='email-input'>
              <span className='sr-only'>Email address</span>
              <input
                autoComplete='email'
                className='min-h-[50px] w-full rounded-md px-4 text-sm font-medium focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black md:min-h-full md:w-72'
                id='email-input'
                name='email'
                placeholder={subscribed ? content.placeholderSubscribed : content.placeholder}
                ref={inputEl}
                required
                type='email'
                disabled={subscribed}
              />
            </label>

            <div className='mt-2 flex rounded-md shadow-sm sm:ml-3 md:mt-0'>
              <button
                className={`exclude-underline ease hover:pointer mb-0 inline-flex w-full items-center justify-center whitespace-nowrap rounded-md border px-6 py-3 text-sm font-semibold uppercase shadow-md transition-all duration-200 hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black md:py-4 ${
                  subscribed
                    ? 'cursor-not-allowed border-gray-600 bg-gray-600/60 text-gray-800 dark:border-gray-600 dark:text-white'
                    : 'border-primary-600 bg-primary-500 text-white hover:border-primary-500 hover:bg-primary-400 dark:bg-primary-500 dark:text-white dark:hover:border-primary-600 dark:hover:bg-primary-600'
                } `}
                type='submit'
                disabled={subscribed}
              >
                {subscribed ? 'THANK YOU!' : content.button}
              </button>
            </div>
          </div>
          {!subscribed && (
            <div className='mt-3 flex w-full items-start space-x-2 sm:mt-4'>
              <input
                type='checkbox'
                id='consent-checkbox'
                onChange={(e) => setConsent(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black'
              />
              <label
                htmlFor='consent-checkbox'
                className='text-left text-xs font-medium leading-tight text-gray-600 dark:text-gray-400'
              >
                {content.consent}
              </label>
            </div>
          )}
        </form>

        {error && (
          <div className='w-72 pt-2 text-sm font-medium text-accent-500 dark:text-accent-500 sm:w-96'>{message}</div>
        )}
        {subscribed && <p className='mt-4 text-sm font-medium text-green-600 dark:text-green-400'>{message}</p>}
        {disclaimer && <p className='mt-4 text-xs italic text-gray-500 dark:text-gray-400'>{disclaimer}</p>}
      </div>
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({
  title = content.blogTitle,
  description = content.blogDescription,
  disclaimer = content.disclaimer,
}) => (
  <div className='mt-6 flex items-center justify-center'>
    <div className='mx-6 w-full rounded-md border bg-gray-100 px-6 py-8 dark:border-gray-600/60 dark:bg-black'>
      <NewsletterForm title={title} description={description} disclaimer={disclaimer} />
    </div>
  </div>
)
