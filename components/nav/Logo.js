import React from 'react'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

const Logo = () => {
  return (
    <Link style={{ width: '50px' }} href="/" aria-label={siteMetadata.headerTitle} passHref>
      <div className="hover:cursor-pointer">
        <div className="block dark:hidden">
          <img
            src="/static/images/logos/logo-light.svg"
            alt="Logo Light"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div className="hidden dark:block">
          <img
            src="/static/images/logos/logo.svg"
            alt="Logo Dark"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </Link>
  )
}

export default Logo
