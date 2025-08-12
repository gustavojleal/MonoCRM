import { useState, useEffect, useRef, useContext } from 'react';
import { Check } from 'react-feather';
import { AppConfigContext } from '../app/AppConfigProvider';
import i18n from '../i18n/i18n';
import { iLanguage } from '../i18n/resources';

type LanguageSwitchProps = {
  languages: iLanguage[];
  initialLanguage?: string;
  onChange: (languageCode: string) => void;
  darkMode?: boolean;
};

const LanguageSwitch = ({
  languages,
  initialLanguage = 'enUS',
  onChange,
  darkMode = false,
}: LanguageSwitchProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<iLanguage>(
    languages.find(lang => lang.code === initialLanguage) || languages[0]
  );
  const appConfig = useContext(AppConfigContext);
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const lang = languages.find(l => l.code === i18n.language || l.resource === i18n.language);
      if (lang) setCurrentLanguage(lang);
    };
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, [languages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: iLanguage) => {
    setCurrentLanguage(lang);
    if (appConfig && appConfig.toggleLanguage) {
      appConfig.toggleLanguage(lang.resource);
    } else {
      onChange(lang.code);
    }
  };

  return (
    <div
      className={`language-switch ${darkMode ? 'dark-mode' : ''}`}
      ref={dropdownRef}
    >

      {isOpen && (
        <div className={`language-dropdown`}>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLanguage.code ? 'selected' : ''}`}
              onClick={() => handleLanguageChange(lang)}
              role="option"
              aria-selected={lang.code === currentLanguage.code}
            >
              <div className="language-icon">

                {lang.flag && (<span>
                  <img
                    alt={lang.name}
                    src={`https://flagcdn.com/${lang.flag}.svg`}
                    style={{ marginRight: 8, verticalAlign: 'middle', width: 20 }}

                  />
                </span>)}

                <>{lang.name}</>
              </div>
              {lang.code === currentLanguage.code && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;