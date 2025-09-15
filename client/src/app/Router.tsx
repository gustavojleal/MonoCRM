import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from '../pages/HomePage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import CreateContactForm from '../features/contact/components/ContactForm';
// import CreateContactForm from '../components/Forms/ContactForm';
import ContactList from '../features/contact/components/ContactList';
import UserLogin from '../components/Forms/UserLogin'
import AdminDashboard from '../pages/AdminDashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'homepage', element: <HomePage /> },
      { path: 'aboutpage', element: <AboutPage /> },
      { path: 'contactpage', element: <ContactPage /> },
      { path: 'createcontact', element: <CreateContactForm /> },
      { path: 'contactlist', element: <ContactList /> },
      { path: 'userlogin', element: <UserLogin /> },
      { path: 'admindashboard', element: <AdminDashboard /> }

    ]
  }
]);

export default router;