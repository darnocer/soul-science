'use client'

import { useMemo } from 'react'
import Image from 'next/image'

import SectionContainer from '@/components/layout/SectionContainer'
import { BlogSEO } from '@/components/seo/SEO'
import siteMetadata from '@/data/siteMetadata'

import PostHeaderSimple from '@/components/headings/PostHeader'
import BlogSidebar from '@/components/post/BlogSidebar'

import { BlogNewsletterForm } from '@/components/blocks/NewsletterForm'

import ScrollIndicator from '@/components/post/ScrollIndicator'
import MobilePostPagination from '@/components/post/MobilePostPagination'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, image, tags, summary, content_type, author } = frontMatter

  const imagePath = image ? `/static/images/featured/${image}.jpg` : `/static/images/featured/default.png`

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
              <BlogSidebar type={content_type} author={author} tags={tags} next={next} prev={prev} date={date} />
              <main className='xl:col-span-3 xl:row-span-2 xl:pb-0'>
                <div className='relative mb-6 mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg'>
                  <Image src={imagePath} alt={title} fill className='object-cover' priority />
                </div>
                <div className='prose max-w-none pb-6 font-serif dark:prose-dark'>{children}</div>
                <BlogNewsletterForm />
                <MobilePostPagination next={next} prev={prev} />
              </main>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
