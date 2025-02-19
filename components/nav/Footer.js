import Link from '@/components/links/Link'
import siteMetadata from '@/data/siteMetadata'
import footerNavLinks from '@/data/nav/footerNavLinks'
import SocialIcon from '@/components/icons/social-icons'

export default function Footer() {
  return (
    <footer className='mt-auto'>
      <div className='mt-12 flex flex-col items-center font-medium'>
        <div className='mb-3 flex space-x-4'>
          {footerNavLinks.map((link, index) => (
            <span key={link.title} className='flex items-center'>
              <Link className='text-xxs uppercase text-gray-600 underline dark:text-gray-400' href={link.href}>
                {link.title}
              </Link>
              {index < footerNavLinks.length - 1 && <span className='ml-2  text-gray-500 dark:text-gray-400'>|</span>}
            </span>
          ))}
        </div>
        <div className='mt-4 mb-2 flex flex-col items-center text-xxs text-gray-500 dark:text-gray-400'>
          <p className='text-xxs'>
            Made with 👽 by{' '}
            <a className='underline' href={siteMetadata.website} target='_blank' rel='noreferrer'>
              darian.
            </a>
          </p>
          <p>{`© ${new Date().getFullYear()} rootedvision`}</p>
        </div>
      </div>
    </footer>
  )
}
