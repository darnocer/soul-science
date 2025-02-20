import fs from 'fs'
import PageTitle from '@/components/headings/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFiles, getMdxContent, getSectionContent } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostSimple'

export async function getStaticPaths() {
  const posts = getFiles()
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter()
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getMdxContent(params.slug.join('/'))
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    // const authorResults = await getDataFile('authors', [author])
    const authorResults = await getSectionContent('about')
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post
  // console.log(post)

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className='mt-24 text-center'>
          <PageTitle>
            Under Construction{' '}
            <span role='img' aria-label='roadwork sign'>
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
