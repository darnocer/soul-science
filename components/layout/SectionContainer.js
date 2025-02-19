import React from 'react'

const SectionContainer = ({ padding, container, children }) => {
  const paddingClassNames = {
    small: 'py-3',
    medium: 'py-5',
    large: 'py-7',
    xlarge: 'py-9',
  }
  const containerClassNames = {
    small: 'max-w-3xl',
    medium: 'max-w-4xl',
    large: 'max-w-5xl',
  }

  const sectionClasses = `${padding ? paddingClassNames[padding] : paddingClassNames.medium}`
  const containerClasses = `m-auto w-full ${container ? containerClassNames[container] : containerClassNames.small}`

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>{children}</div>
    </section>
  )
}

export default SectionContainer
