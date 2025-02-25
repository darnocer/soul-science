'use client'

import { useMemo } from 'react'

import SectionContainer from '@/components/layout/SectionContainer'
import { BlogSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'

import PostHeaderSimple from '@/components/headings/PostHeader'
import BlogSidebar from '@/components/post/BlogSidebar'

import { BlogNewsletterForm } from '@/components/blocks/NewsletterForm'

import ScrollIndicator from '@/components/post/ScrollIndicator'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags, summary, content_type, author } = frontMatter

  return (
    <>
      <SectionContainer padding='medium' container='large'>
        <BlogSEO url={`${siteMetadata.siteUrl}/${slug}`} authorDetails={authorDetails} {...frontMatter} />
        <ScrollIndicator />
        <article>
          <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
            <header>
              <PostHeaderSimple title={title} summary={summary} tags={tags} date={date} contentType={content_type} />
            </header>
            <div
              className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <BlogSidebar type={content_type} author={author} tags={tags} next={next} prev={prev} />
              <main className=' xl:col-span-3 xl:row-span-2 xl:pb-0'>
                <div className='prose max-w-none pb-6 pt-10 font-serif dark:prose-dark'>{children}</div>
                {/* <div className='pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'>
                <Link href={discussUrl(slug)} rel='nofollow'>
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} /> */}
                <BlogNewsletterForm />
              </main>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
