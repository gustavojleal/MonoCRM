import { RouterProvider } from 'react-router-dom';
import { AppConfigProvider } from './app/AppConfigProvider';
import { NotificationProvider } from './context/NotificationContext';
import router from './app/Router';
import { AppLayout } from './layouts/AppLayout';

import './i18n/utils';

function App() {
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

