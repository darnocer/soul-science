import SocialIcon from '@/components/icons/social-icons'
import Image from '@/components/blocks/Image'
import { PageSEO } from '@/components/seo/SEO'

import Heading from '@/components/headings/Heading'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, bio } = frontMatter

  return (
    <>
      <PageSEO title={`About | ${name}`} description={`About me - ${name}`} />
      <Heading text='About' />

      <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
        <div className='mt-2 flex h-full flex-col items-center rounded-md bg-gray-800 bg-opacity-80 p-4'>
          <Image src={avatar} alt='avatar' width='192px' height='192px' className='h-48 w-48 rounded-full' />
          <h3 className='pt-4 pb-2 text-2xl font-medium leading-8 tracking-tight'>{name}</h3>
          <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
          <div className='text-gray-500 dark:text-gray-400'>{company}</div>
          <div className='flex space-x-3 pt-2'>
            <SocialIcon kind='mail' href={`mailto:${email}`} />
            <SocialIcon kind='github' href={github} />
            <SocialIcon kind='linkedin' href={linkedin} />
            <SocialIcon kind='twitter' href={twitter} />
          </div>
          <div className='pt-4 text-center font-medium text-gray-500 dark:text-gray-300'>{bio}</div>
        </div>
        <div className='prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2'>{children}</div>
      </div>
    </>
  )
}
