'use client'

import { useEffect } from 'react'
import { useLanguageStore } from '@/store/languageStore'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguageStore()

  useEffect(() => {
    // Initialize language from localStorage after mount (client-side only)
    const stored = localStorage.getItem('parfumex-language')
    if (stored && (stored === 'fr' || stored === 'ar')) {
      setLanguage(stored as 'fr' | 'ar')
    }
  }, [setLanguage])

  return <>{children}</>
}
