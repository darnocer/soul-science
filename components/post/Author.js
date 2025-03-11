import Image from 'next/image'
import authors from '@/data/authors'

const Author = ({ author }) => {
  if (!author) return null

  if (typeof author === 'string') {
    const authorData = authors[author.toLowerCase()]
    if (!authorData) return null
    return (
      <div className='flex items-center space-x-3'>
        <Image src={authorData.avatar} alt={authorData.name} width={28} height={28} className='rounded-full' />
        <span className='text-primary-800 dark:text-primary-800 text-xs font-semibold'>{authorData.name}</span>
      </div>
    )
  }

  if (typeof author === 'object' && author.name) {
    return (
      <div className='flex items-center space-x-3'>
        {author.avatar && (
          <Image src={author.avatar} alt={author.name} width={28} height={28} className='rounded-full' />
        )}
        <span className='text-primary-800 dark:text-primary-800 text-xs font-semibold'>{author.name}</span>
      </div>
    )
  }

  return null
}

export default Author
