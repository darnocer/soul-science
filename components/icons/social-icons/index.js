import Mail from './mail.svg?react'
import Github from './github.svg?react'
import Facebook from './facebook.svg?react'
import Youtube from './youtube.svg?react'
import Linkedin from './linkedin.svg?react'
import Twitter from './twitter.svg?react'
import Medium from './medium.svg?react'
import Website from './website.svg?react'
import X from './x.svg?react'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  medium: Medium,
  website: Website,
  x: X,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))) return null

  const SocialSvg = components[kind]
  if (!SocialSvg) {
    console.error(`Invalid SocialIcon kind: ${kind}`)
    return null
  }

  return (
    <a
      className='text-sm text-gray-500 transition hover:text-gray-600'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <span className='sr-only'>{kind}</span>

      <SocialSvg
        className={`h-6 ${
          kind === 'mail' ? 'scale-[1.2]' : ''
        } text-gray-700 duration-200 ease-in hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-500`}
        fill={kind === 'website' ? 'none' : 'currentColor'} // Ensure website icon uses stroke only
      />
    </a>
  )
}

export default SocialIcon
