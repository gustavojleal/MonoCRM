import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import CreateContactForm from '../components/Forms/ContactForm';
import CreateLeadForm from '../components/Forms/LeadForm';
import { LeadPage } from '../pages/LeadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'homepage', element: <HomePage /> },
      { path: 'aboutpage', element: <AboutPage /> },
      { path: 'createContact', element: <CreateContactForm /> },
      { path: 'CreateLead', element: <CreateLeadForm /> },
      { path: 'LeadPage', element: <LeadPage /> },

    ]
  }
]);

export default router;