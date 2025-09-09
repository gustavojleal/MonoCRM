import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiHome, FiUser, FiBriefcase,
  FiCalendar, FiCheckSquare, FiPhone, FiMail,
  FiBarChart2, FiSettings, FiFile, FiBox, FiHelpCircle, FiGlobe, 
} from 'react-icons/fi';
import { getLanguages, changeLanguage } from '../i18n/utils';
import LanguageSwitch from './LanguageSwitch';
import { AppConfigContext } from '../app/AppConfigProvider';


const Sider = () => {
  const { t } = useTranslation();
  
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showDropdownFor, setShowDropdownFor] = useState<string | null>(null);
  const navigate = useNavigate();
  const appConfig = useContext(AppConfigContext);
  
  if (!appConfig) {
    return null;
  }
  
  const { showSider, toggleSider } = appConfig;
 
  const languages = getLanguages();



  const menuItems = [
    { name: 'dashboard', icon: <FiHome />, action: 'homepage' },
    { name: 'contacts', icon: <FiUser />, action: 'contactpage'},
    { name: 'accounts', icon: <FiBriefcase /> },
    { name: 'calendar', icon: <FiCalendar /> },
    { name: 'Activitys', icon: <FiCheckSquare /> },
    { name: 'calls', icon: <FiPhone /> },
    { name: 'email', icon: <FiMail /> },
    { name: 'documents', icon: <FiFile /> },
    { name: 'products', icon: <FiBox /> },
    { name: 'reports', icon: <FiBarChart2 /> },
    { name: 'customer_service', icon: <FiHelpCircle /> },
    { name: 'settings', icon: <FiSettings /> },
    { name: 'users', icon: <FiUser />, action: 'AdminDashboard' },
    { name: 'language', icon: <FiGlobe />, action: 'changeLanguage' },
  ];

  const handleMenuClick = (name: string, action?: string) => {
    if (action === 'changeLanguage') {
      setShowLangDropdown((prev) => !prev);
      setShowDropdownFor(null);
      return;
    }

    if (action) {
      navigate(`/${action}`);
    } else if (name) {
      setShowDropdownFor((prev) => (prev === name ? null : name));
    }
  };

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setShowLangDropdown(false);
    
  };

  return (
    <aside className={`sider ${showSider ? '' : 'collapsed'}`}>
           <button
          className="sider-toggle"
          onClick={toggleSider}
          aria-label={t('header.toggleSider')}
        >
          {showSider ? (
            <i className="fas fa-chevron-left"></i>
          ) : (
            <i className="fas fa-chevron-right"></i>
          )}
        </button>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="menu-item">
              <div className={`menu-item-content ${showDropdownFor === item.name ? 'expanded' : ''}`}
                onClick={() => handleMenuClick(item.name, item.action)}
                >
                <span className="menu-icon">{item.icon}</span>
                {showSider && <span>{t(item.name)}</span>}
       
              </div>
  
            </li>
          ))}

          {showLangDropdown && (
            <div style={{ position: 'relative', zIndex: 1 }} className="sider-menu-btn">
              <LanguageSwitch
                languages={languages}
                onChange={handleLanguageChange}
                darkMode={false}
              />
            </div>
          )}
        </ul>
      </nav>

    </aside>
  );
};

export default Sider;