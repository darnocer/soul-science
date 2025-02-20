import siteMetadata from '@/data/siteMetadata'
import pageMetadata from '@/data/pageMetadata'
import { PageSEO } from '@/components/seo/SEO'

const MetadataWrapper = ({ title = 'no-title', children }) => {
  const metadata = pageMetadata[title] ?? {}

  const metaTitle = metadata.title || (title !== 'no-title' ? title : 'no-title')
  const metaDescription = metadata.description || siteMetadata.description
  const metaImage = metadata.metaImage || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`

  return (
    <>
      <PageSEO title={metaTitle} description={metaDescription} metaImage={metaImage} />
      {children}
    </>
  )
}

export default MetadataWrapper
