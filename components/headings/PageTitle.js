export default function PageTitle({ children }) {
  return (
    <h1 className="text-5xl font-extrabold leading-14 tracking-tighter text-gray-900 dark:text-gray-100 md:text-6xl">
      {children}
    </h1>
  )
}
