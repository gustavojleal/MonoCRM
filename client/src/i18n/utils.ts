import { languages, iLanguage } from './resources';
import i18n from './i18n';

export function changeLanguage(langCode: string) {
  i18n.changeLanguage(langCode);
  localStorage.setItem('language', langCode);
}

export async function getResources() {
  const results = await Promise.all(
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
  );
  return Object.fromEntries(results.filter(Boolean) as Array<[string, any]>);
}

export const getLanguages = (): iLanguage[] => {
  return languages.filter(l => l.resource);
};