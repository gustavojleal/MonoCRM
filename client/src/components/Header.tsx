import React from 'react';
import { PiSidebarThin, PiUserCircleThin } from "react-icons/pi";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
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

  const { toggleSider, toggleLogged, userLogged } = appConfig;

  const handleSearchSubmit = (searchTerm: string) => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement actual search functionality here
  };


  const handleProfile = (() => { navigate("userlogin"); })

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
      {!userLogged &&
        <button
          className="user-profile"
          onClick={handleProfile}
          aria-label={t('header.login')}
        >
          <PiUserCircleThin size={40} className="profile-icon" />
        </button>
      }
      {userLogged &&
        <button
          className="user-profile"
          onClick={toggleLogged}
          aria-label={t('header.login')}
        >
          <FaPersonWalkingArrowLoopLeft size={40} className="profile-icon" />
        </button>
      }
    </header>
  );
};

export default Header;