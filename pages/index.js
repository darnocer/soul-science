import MetadataWrapper from '@/components/seo/MetadataWrapper'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getSectionContent, getAllFilesFrontMatter } from '@/lib/mdx'

import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('@/components/blocks/Hero'), { ssr: false })
const CardLayout = dynamic(() => import('@/components/listings/CardLayout'), { ssr: false })

const PAGE_TITLE = 'Home'

export async function getStaticProps() {
  const homeContent = await getSectionContent('home')
  const posts = await getAllFilesFrontMatter()

  return { props: { posts, homeContent } }
}

export default function Home({ posts, homeContent }) {
  const { mdxSource, frontMatter } = homeContent
  const DEFAULT_LAYOUT = 'ContentLayout'

  return (
    <MetadataWrapper>
      {typeof window !== 'undefined' && (
        <>
          <Hero
            heading='Soul Signals'
            subtitle='Microdoses of wisdom for soul searchers and truth seekers.'
            description='Subscribe for short insights on presence, healing, and self-discovery.'
            disclaimer='this is a disclaimer'
          />
          <CardLayout posts={posts} heading='All Posts' />
        </>
      )}
    </MetadataWrapper>
  )
}
