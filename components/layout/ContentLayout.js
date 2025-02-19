import SectionContainer from '@/components/layout/SectionContainer'

export default function ContentLayout({ children }) {
  return (
    <SectionContainer padding='large' container='small'>
      <div className='prose max-w-none font-serif leading-normal dark:prose-dark'>{children}</div>
    </SectionContainer>
  )
}
