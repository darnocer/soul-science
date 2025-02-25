import SocialIcon from '@/components/icons/social-icons'
import Image from '@/components/blocks/Image'

import Heading from '@/components/headings/Heading'
import SectionContainer from '@/components/layout/SectionContainer'
import CtaButton from '@/components/links/CtaButton'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, linkedin, bio, medium, website } = frontMatter

  return (
    <div className='mx-auto max-w-5xl'>
      <Heading level='h1'>About</Heading>

      <div className='items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'>
        <aside className='rounded-md border bg-white p-4 text-center dark:border-gray-700 dark:bg-black xl:sticky xl:top-24 xl:col-start-1 xl:row-span-2 xl:max-h-max'>
          <Image src={avatar} alt='avatar' width='192' height='192' className='h-48 w-48 rounded-full' />
          <h4 className='pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight'>{name}</h4>
          <div className='text-gray-500 dark:text-gray-400'>{occupation}</div>
          <div className='font-semibold text-gray-500 dark:text-gray-400'>{company}</div>
          <div className='flex justify-center space-x-3 pt-2'>
            <SocialIcon kind='website' href={website} />
            <SocialIcon kind='mail' href={`mailto:${email}`} />
            <SocialIcon kind='linkedin' href={linkedin} />
            <SocialIcon kind='medium' href={medium} />
          </div>
          <div className='mb-8 mt-4 pt-4 font-serif text-sm text-gray-500 dark:text-gray-300'>{bio}</div>
          <CtaButton text='Schedule 30 Minutes' action='schedule' link='https://calendly.com/soul-science/30' />
        </aside>
        <main className='prose max-w-none font-serif  text-gray-800 dark:prose-dark dark:text-gray-200 xl:col-span-2'>
          {children}
        </main>
      </div>
    </div>
  )
}
