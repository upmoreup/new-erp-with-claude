import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en/translation.json'
import koTranslation from './ko/translation.json'

const resources = {
  en: { translation: enTranslation },
  ko: { translation: koTranslation },
}

// Get initial language from localStorage if available
const storedLanguage = localStorage.getItem('language-storage')
let initialLanguage = 'en'
if (storedLanguage) {
  try {
    const parsed = JSON.parse(storedLanguage)
    initialLanguage = parsed.state?.language || 'en'
  } catch {
    initialLanguage = 'en'
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
