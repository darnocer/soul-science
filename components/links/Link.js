import Link from 'next/link'

const CustomLink = ({ href, children, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} passHref {...rest}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target='_blank' rel='noopener noreferrer' {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
