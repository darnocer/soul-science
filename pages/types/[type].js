import { TagSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/components/listings/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTypes } from '@/lib/getAllTypes'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

import pageContent from '@/data/pageContent'

const root = process.cwd()

export async function getStaticPaths() {
  const types = await getAllTypes()
  // console.log('Generated Type Paths:', types)

  const paths = Object.keys(types)
    .filter((type) => type)
    .map((type) => ({
      params: { type: kebabCase(type) },
    }))

  // console.log('Generated Paths:', paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter()

  const filteredPosts = allPosts.filter((post) => {
    if (post.draft) return false

    const postTypes = Array.isArray(post.content_type) ? post.content_type : [post.content_type]
    return postTypes.some((type) => kebabCase(type) === params.type)
  })

  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `types/${params.type}/feed.xml`)
    const rssPath = path.join(root, 'public', 'types', params.type)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, type: params.type } }
}

export default function Type({ posts, type }) {
  const title = type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  // const description = pageContent.type.description(title)

  return (
    <>
      <TagSEO title={`${title} Posts`} description={`${title} tags | ${siteMetadata.author}`} />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
