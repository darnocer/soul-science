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

        <div className='flex flex-col content-between'>
          <nav className='m-0 flex justify-center text-sm font-medium text-gray-600 dark:text-gray-400 md:mr-6 md:justify-end'>
            {footerNavLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className='font-semibold uppercase transition-all duration-200 ease-in hover:text-gray-900 hover:underline dark:hover:text-gray-300'
                >
                  {link.title}
                </Link>
                {index < footerNavLinks.length - 1 && ( // Only add the pipe between links, not at the end
                  <span className='mx-2 text-gray-500 dark:text-gray-400'>|</span>
                )}
              </React.Fragment>
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
