export default function PageTitle({ children }) {
  return (
    <h1 className='text-center text-5xl font-extrabold capitalize leading-14 tracking-tighter text-gray-900 dark:text-gray-100 md:text-6xl'>
      {children}
    </h1>
  )
}
