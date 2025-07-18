import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'homepage',
        element: <HomePage />
      },
      {
        path: 'aboutpage',
        element: <AboutPage />
      }

    ]
  }
]);

export default router;