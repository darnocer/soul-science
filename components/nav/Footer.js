import Logo from '@/components/nav/Logo'
import footerNavLinks from '@/data/nav/footerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/links/Link'
import NewsletterForm from '@/components/blocks/NewsletterForm'
import React from 'react'

export default function Footer() {
  return (
    <footer className='mt-10 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black'>
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between px-6 py-8 md:flex-row'>
        <div className='mb-6 flex max-w-xs flex-col items-center text-center md:mb-0 md:items-start md:text-left'>
          <Logo type='full' />
          <p className='mt-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-500 md:px-0'>
            {siteMetadata.description}
          </p>
        </div>

        <div className='flex flex-col content-between gap-y-2'>
          <Link
            href='https://www.instagram.com/soulsciencehq'
            className='flex flex-row justify-end text-sm font-medium uppercase text-gray-600 underline dark:text-gray-400'
          >
            @soulsciencehq
          </Link>
          <nav className='m-0 flex flex-col items-center space-y-2 text-sm font-medium text-gray-600 dark:text-gray-400 md:flex-row md:justify-end md:space-x-4 md:space-y-0'>
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='uppercase underline transition-all duration-200 ease-in hover:text-gray-900 hover:underline dark:hover:text-gray-300'
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <div className='mt-6 max-w-md'>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className='mb-2 mt-4 flex flex-col items-center text-xxs text-gray-500 dark:text-gray-400'>
        <p className='text-xxs'>
          Made with 👽 by{' '}
          <a className='underline' href='/about' rel='noreferrer'>
            darian.
          </a>
        </p>
        <p>{`© ${new Date().getFullYear()} rootedvision, LLC.`}</p>
      </div>
    </footer>
  )
}
