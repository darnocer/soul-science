import React from 'react'
import LinkArrow from './LinkArrow'

export default function Breadcrumbs({ href = '/posts', text = 'Back to All Posts', direction = 'left' }) {
  return <LinkArrow text={text} direction='left' href={href} />
}
