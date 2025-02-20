import React from 'react'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

const Logo = ({ size = 'large', type = 'regular' }) => {
  const sizeClass = size === 'small' ? 'w-[250px]' : ''
  const logoLight = type === 'full' ? '/static/images/logos/logo-full-light.svg' : '/static/images/logos/logo-light.svg'
  const logoDark = type === 'full' ? '/static/images/logos/logo-full.svg' : '/static/images/logos/logo.svg'

  return (
    <Link href='/' aria-label={siteMetadata.headerTitle} passHref>
      <div className={`hover:cursor-pointer ${sizeClass}`}>
        <div className='block dark:hidden'>
          <img src={logoLight} alt='Logo Light' className='h-auto w-full' />
        </div>
        <div className='hidden dark:block'>
          <img src={logoDark} alt='Logo Dark' className='h-auto w-full' />
        </div>
      </div>
    </Link>
  )
}

export default Logo
