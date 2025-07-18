import { RouterProvider } from 'react-router-dom';
import { AppConfigProvider } from './app/AppConfigContext';
import router from './app/Router';
import './i18n/utils';

function App() {
  return (
    <AppConfigProvider>
      <RouterProvider router={router} />
    </AppConfigProvider>
  );
}

export default App;