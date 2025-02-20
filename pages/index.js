import MetadataWrapper from '@/components/seo/MetadataWrapper'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getSectionContent, getAllFilesFrontMatter } from '@/lib/mdx'

import Hero from '@/components/marketing/Hero'
import CardLayout from '@/components/listings/CardLayout'

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
      <Hero
        heading='Soul Signals'
        subtitle='Microdoses of wisdom for soul searchers and truth seekers.'
        description='Subscribe for short insights on presence, healing, and self-discovery.'
        disclaimer='this is a disclaimer'
      />

      <CardLayout posts={posts} heading='All Posts' />
    </MetadataWrapper>
  )
}
