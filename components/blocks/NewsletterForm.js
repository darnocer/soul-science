import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'
import pageContent from '@/data/pageContent'

import SectionContainer from '@/components/layout/SectionContainer'

const NewsletterForm = ({ title = 'Stay in Touch', description }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

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
      setMessage('Oops. Your e-mail address is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Success! 🎉 You are now subscribed.')
  }

  return (
    <SectionContainer padding='small'>
      <div className='border-t-2 border-gray-200 py-6 dark:border-gray-700'>
        <div className='justify-content flex flex-col items-start'>
          <h3 className='text-md pb-1 font-semibold text-gray-800 dark:text-gray-200'>{title}</h3>
          <p className='mt-2 mb-4 text-xs font-medium text-gray-400'>{description}</p>
          <form className='flex max-w-md flex-col sm:flex-row' onSubmit={subscribe}>
            <div>
              <label htmlFor='email-input'>
                <span className='sr-only'>Email address</span>
                <input
                  autoComplete='email'
                  className='w-72 rounded-md px-4 text-sm font-medium focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black'
                  id='email-input'
                  name='email'
                  placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
                  ref={inputEl}
                  required
                  type='email'
                  disabled={subscribed}
                />
              </label>
            </div>
            <div className='mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3'>
              <button
                className={`w-full rounded-md bg-primary-500 py-4 px-6 text-sm font-semibold uppercase leading-none text-white transition-all duration-300 ease-in sm:py-0 ${
                  subscribed ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
                } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
                type='submit'
                disabled={subscribed}
              >
                {subscribed ? 'Thank you!' : 'Sign up'}
              </button>
            </div>
          </form>
          {error && <div className='w-72 pt-2 text-sm text-accent-500 dark:text-accent-400 sm:w-96'>{message}</div>}
        </div>
      </div>
    </SectionContainer>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className='flex items-center justify-center'>
    <div className='bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8'>
      <NewsletterForm title={title} />
    </div>
  </div>
)
