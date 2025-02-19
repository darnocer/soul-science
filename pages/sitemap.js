import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getMdxContent } from '@/lib/mdx'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

const DEFAULT_LAYOUT = 'PageLayout'
const PAGE_TITLE = 'Sitemap'

export async function getStaticProps() {
  const content = await getMdxContent('data', 'content', ['sitemap'])
  return { props: { content } }
}

export default function Sitemap({ content }) {
  const { mdxSource, frontMatter } = content

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
