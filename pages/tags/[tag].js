import { TagSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/components/listings/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/getAllTags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

import pageContent from '@/data/pageContent'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter()
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const description = pageContent.tag.description(tag)

  return (
    <>
      <TagSEO title={`${title} Posts`} description={`${title} tags | ${siteMetadata.author}`} />
      <ListLayout posts={posts} title={title} description={description} />
    </>
  )
}
