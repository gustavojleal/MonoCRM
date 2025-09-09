import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppConfigContext } from '../app/AppConfigProvider';
import SearchBox from './SearchBox';

const Header = () => {
  const appConfig = React.useContext(AppConfigContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (!appConfig) {
    return null;
  }

  const { toggleLogged, userLogged, toggleTheme, theme } = appConfig;

  const handleSearchSubmit = (searchTerm: string) => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement actual search functionality here
  };


  const handleProfile = (() => { navigate("userlogin"); })

  return (
    <header className="header">
 
        <h1>Micro CRM</h1>
        <SearchBox
          placeHolder={t("search.placeholder")}
          onSubmit={handleSearchSubmit}
          ariaLabel={t("header.search.ariaLabel")}
        />
        
      <div className="header-actions">
        <div className="theme-toggle" id="themeToggle">
          {theme === 'light' ? (
            <i className="fas fa-moon" onClick={toggleTheme}></i>
          ) : (
            <i className="fas fa-sun" onClick={toggleTheme}></i>
          )}
        </div>
        
        <div className="user-actions">
          {!userLogged ? (
            <button className="login-btn" onClick={handleProfile}>
              Login
            </button>
          ) : (
            <button className="logout-btn" onClick={toggleLogged}>
              Logout
            </button>
          )}
        </div>
        
        <button 
          className="user-profile"
          onClick={userLogged ? toggleLogged : handleProfile}
          aria-label={userLogged ? t('header.logout') : t('header.login')}
        >

        </button>
      </div>


    </header>
  );
};

export default Header;