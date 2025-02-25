import MetadataWrapper from '@/components/seo/MetadataWrapper'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getSectionContent } from '@/lib/mdx'

const PAGE_TITLE = 'About'

export async function getStaticProps() {
  const aboutContent = await getSectionContent('about')

  return { props: { aboutContent } }
}

export default function About({ aboutContent }) {
  const { mdxSource, frontMatter } = aboutContent
  const DEFAULT_LAYOUT = 'AuthorLayout'

  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </MetadataWrapper>
  )
}
