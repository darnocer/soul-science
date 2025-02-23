import Logo from '@/components/nav/Logo'
import NewsletterForm from '@/components/blocks/NewsletterForm'

export default function Hero({ heading, subtitle, description }) {
  return (
    <section className='flex min-h-[50vh] w-full flex-col items-center justify-center text-center md:min-h-[60vh]'>
      <div className='hidden md:block'>
        <Logo />
      </div>
      <h1 className='mt-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl'>
        {heading}
      </h1>
      <p className='mt-4 max-w-2xl text-xl font-semibold text-gray-500 dark:text-gray-200'>{subtitle}</p>
      <p className='mt-4 max-w-2xl text-base font-medium text-gray-600 dark:text-gray-300'>{description}</p>
      <div className='mt-6 w-full max-w-md'>
        <NewsletterForm />
      </div>
    </section>
  )
}
