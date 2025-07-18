import React, { createContext, useState, useCallback } from 'react';
import i18n from '../i18n/i18n';


type AppConfig = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSider: () => void;
  toggleLanguage?: (lang: string) => void;
  showSider: boolean;
  currentLanguage: string;
};

export const AppConfigContext = createContext<AppConfig | null>(null);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showSider, setShowSider] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<string>('enUS');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleSider = () => setShowSider(prev => !prev);
  const toggleLanguage = useCallback((lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <AppConfigContext.Provider
      value={{
        theme,
        toggleTheme,
        toggleSider,
        toggleLanguage,
        showSider,
        currentLanguage,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};