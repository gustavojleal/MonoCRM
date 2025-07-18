// config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export interface iLanguage {
  code: string;
  name: string;
  flag: string;
  resource?: string;
}

// Supported languages configuration
const languages: iLanguage[] = [
  { code: 'enUS', name: 'English', flag: 'us', resource: 'en-US' },
  { code: 'ptBR', name: 'Português', flag: 'br', resource: 'pt-BR' },
  { code: 'esES', name: 'Español', flag: 'es' },
  { code: 'frFR', name: 'Français', flag: 'fr' },
];

// Get only languages with defined resources
const allowedLanguages = languages.filter(l => l.resource).map(l => l.code) as Array<'enUS' | 'ptBR'>;
export type AllowedLanguage = (typeof allowedLanguages)[number];

// Dynamically load translation files
const resources = await Promise.all(
  languages
    .filter(lang => lang.resource)
    .map(async (lang) => {
      try {
        const translations = await import(`./${lang.resource}.json`);
        return [lang.resource, { translation: translations.default }];
      } catch (error) {
        console.error(`Failed to load ${lang.resource} translations:`, error);
        return null;
      }
    })
).then(results => Object.fromEntries(results.filter(Boolean) as Array<[string, any]>));

// Initialize i18n instance
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    interpolation: { 
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false // Disable suspense for better error handling
    }
  });

/**
 * Get initial language based on user preferences
 * @returns Initial language code
 */
export const getInitialLanguage = (): AllowedLanguage => {
  // Try to get stored language from localStorage
  const stored = localStorage.getItem('i18nextLng');
  if (stored) {
    // Map resource to language code
    const lang = languages.find(l => l.resource === stored);
    if (lang && allowedLanguages.includes(lang.code as AllowedLanguage)) {
      return lang.code as AllowedLanguage;
    }
  }
  
  // Try to match browser language
  const browserLang = navigator.language;
  const found = languages.find(l => 
    l.resource === browserLang || 
    l.resource?.startsWith(browserLang.split('-')[0])
  );
  
  return (found?.code as AllowedLanguage) || 'enUS';
};

/**
 * Get available languages with resources
 * @returns Array of language objects
 */
export const getLanguages = (): iLanguage[] => {
  return languages.filter(l => l.resource);
};

/**
 * Change application language
 * @param lang Language code to change to
 */
export const changeLanguage = (lang: AllowedLanguage) => {
  const langObj = languages.find(l => l.code === lang);
  if (langObj?.resource) {
    i18n.changeLanguage(langObj.resource);
    localStorage.setItem('language', lang);
  }
};

/**
 * Get current active language code
 * @returns Current language code
 */
export const getCurrentLanguage = (): AllowedLanguage => {
  // Map i18n resource back to language code
  const currentResource = i18n.language;
  const found = languages.find(l => l.resource === currentResource);
  
  // Fallback to enUS if not found
  return (found?.code as AllowedLanguage) || 'enUS';
};

/**
 * Get language name by code
 * @param lang Language code
 * @returns Language name
 */
export const getLanguageName = (lang: AllowedLanguage): string => {
  return languages.find(l => l.code === lang)?.name || 'English';
};

export default i18n;