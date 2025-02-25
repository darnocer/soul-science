import dynamic from 'next/dynamic'

const Mail = dynamic(() => import('./mail.svg'))
const Github = dynamic(() => import('./github.svg'))
const Facebook = dynamic(() => import('./facebook.svg'))
const Youtube = dynamic(() => import('./youtube.svg'))
const Linkedin = dynamic(() => import('./linkedin.svg'))
const Twitter = dynamic(() => import('./twitter.svg'))
const Medium = dynamic(() => import('./medium.svg'))
const Website = dynamic(() => import('./website.svg'))

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
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))) return null

  const SocialSvg = components[kind]

  return (
    <a
      className='text-sm text-gray-500 transition hover:text-gray-600'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
    >
      <span className='sr-only'>{kind}</span>
      <SocialSvg
        className={`h-6 text-gray-700 duration-200 ease-in hover:text-tertiary-600 dark:text-gray-200 dark:hover:text-tertiary-500`}
        fill={kind === 'website' ? 'none' : 'currentColor'} // Ensure website icon uses stroke only
      />
    </a>
  )
}

export default SocialIcon
