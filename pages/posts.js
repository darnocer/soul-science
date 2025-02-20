import MetadataWrapper from '@/components/seo/MetadataWrapper'

import { getAllFilesFrontMatter } from '@/lib/mdx'
import pageContent from '@/data/pageContent'

import CardLayout from '@/components/listings/CardLayout'

export const POSTS_PER_PAGE = 10
const PAGE_TITLE = 'Posts'

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
      <CardLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        heading={pageContent.posts.title}
        level='h1'
        description={pageContent.posts.description}
      />
    </MetadataWrapper>
  )
}
