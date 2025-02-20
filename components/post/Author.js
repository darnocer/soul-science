import Image from 'next/image'
import authors from '@/data/authors'

const Author = ({ author }) => {
  if (!author || !authors[author.toLowerCase()]) return null

  const { name, avatar } = authors[author.toLowerCase()]

  return (
    <div className='flex items-center space-x-3'>
      <Image src={avatar} alt={name} width={28} height={28} className='rounded-full' />
      <span className='text-xs font-semibold text-gray-800 dark:text-gray-300'>{name}</span>
    </div>
  )
}

export default Author
