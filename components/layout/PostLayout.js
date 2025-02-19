import Link from '@/components/links/Link'
import PageTitle from '@/components/headings/PageTitle'
import SectionContainer from '@/components/layout/SectionContainer'
import { BlogSEO } from '@/components/seo/SEO'
import CustomImage from '@/components/blocks/Image'
import Tag from '@/components/links/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/post/comments'
import ScrollTopAndComment from '@/components/post/ScrollTopAndComment'
import ScrollIndicator from '@/components/post/ScrollIndicator'
import PostHeaderSimple from '@/components/headings/PostHeaderSimple'
import ChevronLeft from '@/components/icons/ui/ChevronLeftIcon'
import ChevronRight from '@/components/icons/ui/ChevronRightIcon'
import LinkArrow from '@/components/links/LinkArrow'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags, summary, content_type } = frontMatter

  return (
    <SectionContainer padding='medium' container='small'>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} authorDetails={authorDetails} {...frontMatter} />
      <ScrollTopAndComment />
      <ScrollIndicator direction='left' />
      <article>
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
          <header>
            <PostHeaderSimple title={title} summary={summary} tags={tags} date={date} contentType={content_type} />
          </header>
          <div
            className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className='pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700'>
              <dt className='sr-only'>Authors</dt>
              <dd>
                <ul className='flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8'>
                  {authorDetails.map((author) => (
                    <li className='no-arrow flex items-center space-x-2' key={author.name}>
                      {author.avatar && (
                        <CustomImage
                          src={author.avatar}
                          width='38px'
                          height='38px'
                          alt='avatar'
                          borderRadius='rounded-full'
                        />
                      )}
                      <dl className='whitespace-nowrap text-sm font-medium leading-5'>
                        <dt className='sr-only'>Name</dt>
                        <dd className='text-gray-900 dark:text-gray-100'>{author.name}</dd>
                        <dt className='sr-only'>Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <div className='prose max-w-none pt-10 pb-8 dark:prose-dark font-serif'>{children}</div>
              {/* <div className='pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'>
                <Link href={discussUrl(slug)} rel='nofollow'>
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} /> */}
            </div>
            <footer>
              <div className='divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                {tags && (
                  <div className='py-4 xl:py-8'>
                    <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>Tags:</h2>
                    <div className='mt-2 flex flex-wrap gap-y-2'>
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
                    {prev && (
                      <div>
                        <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                          Previous Article:
                        </h2>
                        <div className='mt-2 font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                          <LinkArrow direction='right' href={`/${prev.slug}`} text={prev.title} />
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                          Next Article
                        </h2>
                        <div className='mt-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                          <LinkArrow direction='left' href={`/blog/${next.slug}`} text={next.title} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
