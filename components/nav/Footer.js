import Logo from '@/components/nav/Logo'
import footerNavLinks from '@/data/nav/footerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/links/Link'
import NewsletterForm from '@/components/blocks/NewsletterForm'

export default function Footer() {
  return (
    <footer className='mt-10 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black'>
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between px-6 py-8 md:flex-row'>
        <div className='mb-6 flex max-w-xs flex-col items-center text-center md:mb-0 md:items-start md:text-left'>
          <Logo type='full' />
          <p className='mt-3 text-sm font-medium text-gray-600 dark:text-gray-400'>{siteMetadata.description}</p>
        </div>

        <div className='flex flex-col content-between'>
          <nav className='mr-6 flex justify-end gap-4 text-sm font-medium text-gray-600 dark:text-gray-400'>
            {footerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='font-semibold uppercase underline hover:text-gray-900 dark:hover:text-gray-200'
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <div className='mt-6'>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className='py-4 text-center text-xs font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400'>
        <p>{`© ${new Date().getFullYear()} rootedvision`}</p>
      </div>
    </footer>
  )
}
