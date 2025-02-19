import siteMetadata from '@/data/siteMetadata'
import pageMetadata from '@/data/pageMetadata'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getSectionContent } from '@/lib/mdx'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/getAllTags'

import RecentPosts from '@/components/listings/RecentPosts'
import RecentSnippets from '@/components/listings/RecentSnippets'
import NewsletterForm from '@/components/blocks/NewsletterForm'
import CardGrid from '@/components/blocks/CardGrid'
import SectionContainer from '@/components/layout/SectionContainer'
import TagList from '@/components/links/TagList'

const PAGE_TITLE = 'Home'

export async function getStaticProps() {
  const homeContent = await getSectionContent('home')
  const posts = await getAllFilesFrontMatter()
  const tags = await getAllTags()

  return { props: { posts, homeContent, tags } }
}

export default function Home({ posts, homeContent, tags }) {
  const { mdxSource, frontMatter } = homeContent
  const DEFAULT_LAYOUT = 'ContentLayout'

  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <SectionContainer padding='large' container='small'>
        <CardGrid heading='My Work' type='home' />
      </SectionContainer>

      {/* <SectionContainer padding='large' container='small'>
        <RecentSnippets posts={posts} heading='Latest Musing' numPosts={1} />
      </SectionContainer> */}

      <SectionContainer padding='medium' container='small'>
        <TagList tags={tags} heading='Explore By Topic' level='h2' />
      </SectionContainer>

      {/* <SectionContainer padding='medium' container='small'>
        <RecentPosts posts={posts} heading='Shorter Reflections' typeFilter='musings' />
      </SectionContainer>

      <SectionContainer padding='medium' container='small'>
        <RecentPosts posts={posts} heading='Longer Posts' typeFilter='!musings' />
      </SectionContainer> */}

      {/* {siteMetadata.newsletter.provider !== '' && (
        <NewsletterForm
          title={pageContent.newsletter.heading}
          description={pageContent.newsletter.description}
        />
      )} */}
    </MetadataWrapper>
  )
}
