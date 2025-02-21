import SectionContainer from '@/components/layout/SectionContainer'
import { BlogSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'

import Breadcrumbs from '@/components/links/Breadcrumbs'
import { useRouter } from 'next/router'
import LinkArrow from '@/components/links/LinkArrow'
import PostHeader from '@/components/headings/PostHeader'

import { useEffect } from 'react'

import Prism from 'prismjs'
import '../../lib/prism/dataview'

// import dynamic from 'next/dynamic'
// const ScrollIndicator = dynamic(() => import('@/components/post/ScrollIndicator'), { ssr: false })

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title, tags, summary, content_type } = frontMatter

  const router = useRouter()
  const directory = router.pathname.split('/')[1]

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />

      {/* <ScrollIndicator direction='left' /> */}
      <article className='m-auto max-w-3xl'>
        <header>
          <PostHeader title={title} summary={summary} tags={tags} date={date} contentType={content_type} />
        </header>

        <section
          className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 '
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
            <div className='section prose max-w-none pb-8 pt-10 font-serif dark:prose-dark'>{children}</div>
          </div>
        </section>
        <footer>
          {/* <Comments frontMatter={frontMatter} /> */}
          <div className='flex flex-col justify-between gap-y-2 text-sm font-medium sm:flex-row sm:text-base'>
            {prev && (
              <div className='text-left'>
                <LinkArrow text={prev.title} direction='left' href={`/${prev.slug}`} />
              </div>
            )}
            {next && (
              <div className='text-right'>
                <LinkArrow text={next.title} direction='right' href={`/${next.slug}`} />
              </div>
            )}
          </div>
        </footer>
      </article>
    </>
  )
}
