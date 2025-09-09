import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppConfigContext } from './AppConfigProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sider from '../components/Sider';

import '../styles/globalStyle.css';

const MainLayout = () => {
  const appConfig = React.useContext(AppConfigContext);

  useEffect(() => {
    if (appConfig?.showSider) {
      document.body.classList.remove('sider-collapsed');
    } else {
      document.body.classList.add('sider-collapsed');
    }
  }, [appConfig]);

  return (
    <div className="app-container">
      <Header />
      <div className="layout-content">
        <Sider />
        <main className="main-content-container">
          <div className="main-content">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

