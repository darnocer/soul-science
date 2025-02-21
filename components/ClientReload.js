'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const ClientReload = () => {
  const router = useRouter()

  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io()
      socket.on('reload', () => {
        router.replace(router.asPath, { scroll: false })
      })
    })
  }, [router])

  return null
}
