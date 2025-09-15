import React, { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { RouterProvider } from 'react-router-dom';
import { AppConfigProvider } from './app/AppConfigProvider';
import { NotificationProvider } from './context/NotificationContext';
import { AppLayout } from './layouts/AppLayout';
import { fetchRoles  } from './features/roles/rolesSlice';
import router from './app/Router';

import './i18n/utils';

function App() {
  const dispatch = useAppDispatch();
   
  useEffect(() => {
  const fetchLookups = async () => {
    try {
      dispatch(fetchRoles()); 
    } catch (error) {
      console.error('Erro ao buscar dados de lookup:', error);
    }
  };
  fetchLookups();
}, [dispatch]);
  return (
    <AppConfigProvider>

      <NotificationProvider>
        <AppLayout>
          <RouterProvider router={router} />
        </AppLayout>
      </NotificationProvider>
    </AppConfigProvider>
  );
}

export default App;

