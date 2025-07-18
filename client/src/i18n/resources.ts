export interface iLanguage {
  code: string;
  name: string;
  flag?: string;
  resource: string;
}

export const languages: iLanguage[] = [
  { code: 'enUS', name: 'English', flag: 'us', resource: 'en-US' },
  { code: 'ptBR', name: 'Português', flag: 'br', resource: 'pt-BR' },
  { code: 'esES', name: 'Español', flag: 'es', resource: '' },
  { code: 'frFR', name: 'Français', flag: 'fr', resource: '' },
];