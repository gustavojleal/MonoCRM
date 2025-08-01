import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiHome, FiUser, FiTarget, FiBriefcase, FiDollarSign,
  FiCalendar, FiCheckSquare, FiPhone, FiMail,
  FiBarChart2, FiSettings, FiFile, FiBox, FiHelpCircle, FiGlobe
} from 'react-icons/fi';
import { IoMdArrowDropright } from 'react-icons/io';
import { getLanguages, changeLanguage } from '../i18n/utils';
import LanguageSwitch from './LanguageSwitch';
import { AppConfigContext } from '../app/AppConfigProvider';


const Sider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const appConfig = useContext(AppConfigContext);
  const { showSider } = appConfig || {};
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showDropdownFor, setShowDropdownFor] = useState<string | null>(null);

  const languages = getLanguages();



  const menuItems = [
    { name: 'dashboard', icon: <FiHome /> },
    {
      name: 'contacts', icon: <FiUser />, dropdown: [
        { name: 'all_contacts' },
        { name: 'new_contact', action: 'CreateContact' },
      ]
    },
    {
      name: 'leads', icon: <FiTarget />,
      dropdown: [
        { name: 'all_leads' },
        { name: 'new_lead', action: 'CreateLead' },
      ]
    },
    { name: 'accounts', icon: <FiBriefcase /> },
    { name: 'deals', icon: <FiDollarSign /> },
    { name: 'calendar', icon: <FiCalendar /> },
    { name: 'Activitys', icon: <FiCheckSquare /> },
    { name: 'calls', icon: <FiPhone /> },
    { name: 'email', icon: <FiMail /> },
    { name: 'documents', icon: <FiFile /> },
    { name: 'products', icon: <FiBox /> },
    { name: 'reports', icon: <FiBarChart2 /> },
    { name: 'customer_service', icon: <FiHelpCircle /> },
    { name: 'settings', icon: <FiSettings /> },
    { name: 'language', icon: <FiGlobe />, action: 'changeLanguage' },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const label = e.currentTarget.getAttribute('data-label');
    const action = e.currentTarget.getAttribute('data-action');
    if (action === 'changeLanguage') {
      setShowLangDropdown((prev) => !prev);
      setShowDropdownFor(null);
      return;
    }

    if (action) {
      navigate(`/${action}`);
    } else if (label) {
      setShowDropdownFor((prev) => (prev === label ? null : label));
    }
  };

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setShowLangDropdown(false);
  };

  return (
    <aside className={`sider ${showSider ? '' : 'collapsed'}`}>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} style={{ position: 'relative' }}>
              <button
                type="button"
                className="sider-menu-btn"
                data-label={item.name}
                data-action={item.action}
                onClick={handleMenuClick}
              >
                <span className="sider-icon">{item.icon}</span>
                {showSider && <span>{t(item.name)}</span>}
                {item.dropdown && (
                  <span className="sider-icon"><IoMdArrowDropright /></span>
                )}
              </button>
              {item.dropdown && showDropdownFor === item.name && (
                <ul className="sider-dropdown">
                  {item.dropdown.map((sub) => (
                    <li key={sub.name}>
                      <button
                        type="button"
                        className="sider-menu-btn"
                        data-label={sub.name}
                        data-action={sub.action}
                        onClick={handleMenuClick}
                      >
                        {showSider && <span>{t(sub.name)}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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