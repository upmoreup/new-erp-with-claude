import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LanguageType = 'en' | 'ko'

interface LanguageState {
  language: LanguageType
  setLanguage: (language: LanguageType) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    },
  ),
)
