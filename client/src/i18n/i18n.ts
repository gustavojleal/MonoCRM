import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import { getResources } from './utils'

const resources = await getResources()

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  
})

export default i18n