import { MDXLayoutRenderer } from '@/components/MDXComponents'

import { getMdxContent } from '@/lib/mdx'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

import SectionContainer from '@/components/layout/SectionContainer'
import RecentPosts from '@/components/listings/RecentPosts'

const DEFAULT_LAYOUT = 'PageLayout'
const PAGE_TITLE = 'Psychedelics'

export async function getStaticProps() {
  const content = await getMdxContent('data', 'content', ['psychedelics'])
  const posts = await getAllFilesFrontMatter()
  return { props: { content, posts } }
}

export default function Psychedelics({ content, posts }) {
  const { mdxSource, frontMatter } = content

  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />

      <SectionContainer padding='medium' container='small'>
        <RecentPosts posts={posts} heading='Related Posts' tagFilter='psychedelics' />
      </SectionContainer>
    </MetadataWrapper>
  )
}
