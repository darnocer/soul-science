import { getAllFilesFrontMatter } from '@/lib/mdx'

import pageContent from '@/data/pageContent'

import MetadataWrapper from '@/components/seo/MetadataWrapper'

import SectionContainer from '@/components/layout/SectionContainer'
import RecentSnippets from '@/components/listings/RecentSnippets'
import Heading from '@/components/headings/Heading'

export const POSTS_PER_PAGE = 10
const PAGE_TITLE = 'Musings'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter()
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <MetadataWrapper title={PAGE_TITLE}>
      <SectionContainer padding='large' container='small'>
        <Heading level='h1' text='Musings' />
        <RecentSnippets posts={posts} />
      </SectionContainer>
    </MetadataWrapper>
  )
}
