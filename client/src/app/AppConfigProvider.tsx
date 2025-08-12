import React, { createContext, useState, useCallback } from 'react';
import i18n from '../i18n/i18n';


type AppConfig = {
  toggleTheme: () => void;
  toggleSider: () => void;
  toggleLogged: () => void;
  toggleLanguage?: (lang: string) => void;
  theme: 'light' | 'dark';
  userLogged: boolean;
  showSider: boolean;
  currentLanguage: string;
};

export const AppConfigContext = createContext<AppConfig | null>(null);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showSider, setShowSider] = useState<boolean>(true);
  const [userLogged, setUserLogged] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('enUS');

  const toggleLogged = () => setUserLogged(prev => !prev)
  const toggleSider = () => setShowSider(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = useCallback((lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <AppConfigContext.Provider
      value={{
        toggleTheme,
        theme,
        toggleSider,
        showSider,
        toggleLanguage,
        currentLanguage,
        toggleLogged,
        userLogged
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};