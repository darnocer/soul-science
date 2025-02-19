import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getMdxContent } from '@/lib/mdx'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

import SectionContainer from '@/components/layout/SectionContainer'
import RecentPosts from '@/components/listings/RecentPosts'

import { getAllFilesFrontMatter } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PageLayout'
const PAGE_TITLE = 'Meditation'

export async function getStaticProps() {
  const content = await getMdxContent('data', 'content', ['meditation'])
  const posts = await getAllFilesFrontMatter()
  return { props: { content, posts } }
}

export default function Meditation({ content, posts }) {
  const { mdxSource, frontMatter } = content

  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />

      <SectionContainer padding='medium' container='small'>
        <RecentPosts posts={posts} heading='Related Posts' tagFilter='mindfulness' />
      </SectionContainer>
    </MetadataWrapper>
  )
}
