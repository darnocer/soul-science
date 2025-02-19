import SectionContainer from '@/components/layout/SectionContainer'
import { BlogSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'

import Comments from '@/components/post/comments'
import ScrollTopAndComment from '@/components/post/ScrollTopAndComment'
import Breadcrumbs from '@/components/links/Breadcrumbs'
import { useRouter } from 'next/router'
import LinkArrow from '@/components/links/LinkArrow'
import PostHeader from '@/components/headings/PostHeader'

import ScrollIndicator from '@/components/post/ScrollIndicator'

import { useEffect } from 'react'

import Prism from 'prismjs'
import '../../lib/prism/dataview'

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
      <ScrollTopAndComment />
      <ScrollIndicator direction='left' />
      <article className='max-w-3xl m-auto'>
        <header>
          <PostHeader title={title} summary={summary} tags={tags} date={date} contentType={content_type} />
        </header>

        <section
          className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0 '
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
            <div className='section prose max-w-none pt-10 pb-8 font-serif dark:prose-dark'>{children}</div>
          </div>
        </section>
        <footer>
          <Comments frontMatter={frontMatter} />
          <div className='flex flex-col gap-y-2 text-sm font-medium justify-between sm:flex-row sm:text-base'>
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
