import siteMetadata from '@/data/siteMetadata'
import pageMetadata from '@/data/pageMetadata'
import { PageSEO } from '@/components/seo/SEO'

const MetadataWrapper = ({ title, children }) => {
  const pageKey = String(title) // Ensure title is always a string
  const metadata = pageMetadata[pageKey] ?? {} // Use optional chaining

  const metaTitle = metadata.title || pageKey || siteMetadata.title
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
