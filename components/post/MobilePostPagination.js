import LinkArrow from '@/components/links/LinkArrow'

const MobilePostPagination = ({ next, prev }) => {
  return (
    <div className='mt-8 flex flex-row justify-between gap-y-2 text-sm font-medium md:hidden'>
      {next && (
        <div className='text-right'>
          <LinkArrow text='Previous Post' direction='left' href={`/${next.slug}`} />
        </div>
      )}
      {prev && (
        <div className='text-left'>
          <LinkArrow text='Next Post' direction='right' href={`/${prev.slug}`} />
        </div>
      )}
    </div>
  )
}

export default MobilePostPagination
