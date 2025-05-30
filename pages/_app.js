'use client'

import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/previews.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import { useEffect, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'
import CustomAnalytics from '@/components/analytics'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
// import { ClientReload } from '@/components/ClientReload'

import { Analytics } from '@vercel/analytics/react'

// const isDevelopment = process.env.NODE_ENV === 'development'
// const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1 maximum-scale=1' name='viewport' />
      </Head>
      {/* {isDevelopment && isSocket && <ClientReload />} */}
      <CustomAnalytics />
      <Analytics />
      <LayoutWrapper>{typeof window !== 'undefined' && <Component {...pageProps} />}</LayoutWrapper>
    </ThemeProvider>
  )
}
