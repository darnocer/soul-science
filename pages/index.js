import MetadataWrapper from '@/components/seo/MetadataWrapper'
import pageContent from '@/data/pageContent'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('@/components/blocks/Hero'), { ssr: false })
const CardLayout = dynamic(() => import('@/components/listings/CardLayout'), { ssr: false })

const PAGE_TITLE = 'Home'

const content = pageContent.home

export async function getStaticProps() {
  const microPosts = await getAllFilesFrontMatter('musing')
  const macroPosts = await getAllFilesFrontMatter('!musing')

  return { props: { microPosts, macroPosts } }
}

export default function Home({ microPosts, macroPosts }) {
  // const { mdxSource, frontMatter } = homeContent
  // const DEFAULT_LAYOUT = 'ContentLayout'

  return (
    <MetadataWrapper>
      {typeof window !== 'undefined' && (
        <>
          <Hero
            heading={content.hero.heading}
            subtitle={content.hero.subtitle}
            description={content.hero.description}
          />
          <CardLayout posts={microPosts} heading={content.posts.micro.heading} />
          <CardLayout posts={macroPosts} badge={true} heading={content.posts.macro.heading} />
        </>
      )}
    </MetadataWrapper>
  )
}
