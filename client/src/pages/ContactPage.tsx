import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import Tabs, { Tab } from '../components/Tabs';
import ContactList from '../features/contact/components/ContactList';
import ContactForm from '../features/contact/components/ContactForm';
// import ContactForm from '../components/Forms/ContactForm';

const ContactPage: React.FC = () => {
  const tabsItems: Tab[] = [
    {
      id: 'allcontacts',
      label: 'All Contacts',
      content: <ContactList />
    },
    {
      id: 'newcontact',
      label: 'New Contact',
      content: <ContactForm/>
    }
  ]

  return (
    <AppLayout>
      <div className="page-container">
        <Tabs 
          tabs={tabsItems} 
          defaultActiveTab="allcontacts" 
          variant="default" 
          position="top" 
          className="user-settings-tabs"
        />
      </div>

    </AppLayout>
  );
};

export default ContactPage;

