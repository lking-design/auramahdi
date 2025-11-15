import { create } from 'zustand'

type Language = 'fr' | 'ar'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

// Always start with default 'fr' to prevent hydration mismatch
// Language will be loaded from localStorage after mount
export const useLanguageStore = create<LanguageStore>()((set) => {
  return {
    language: 'fr', // Default - always same on server and client
    setLanguage: (lang: Language) => {
      set({ language: lang })
      if (typeof window !== 'undefined') {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        localStorage.setItem('parfumex-language', lang)
      }
    },
  }
})

