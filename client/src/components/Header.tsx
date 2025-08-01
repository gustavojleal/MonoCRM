import React from 'react';
import { PiSidebarThin } from "react-icons/pi";
import { useTranslation } from 'react-i18next';
import { AppConfigContext } from '../app/AppConfigProvider';
import SearchBox from './SearchBox';

const Header = () => {
  const { t } = useTranslation();
  const appConfig = React.useContext(AppConfigContext);
  console.log(appConfig, 'AppConfig in Header');
  if (!appConfig) {
    return null;
  }

  const { toggleSider } = appConfig;

  const handleSearchSubmit = (searchTerm: string) => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement actual search functionality here
  };

  return (
    <header className="header">
      <div className="header-container">
        <button
          className="sider-toggle"
          onClick={toggleSider}
          aria-label={t('header.toggleSider')}
        >
          <PiSidebarThin size={20} className="side-icon" />
        </button>

        <div className="search-container">
          <SearchBox
            placeHolder={t("search.placeholder")}
            onSubmit={handleSearchSubmit}
            ariaLabel={t("header.search.ariaLabel")}
            darkMode={true}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;