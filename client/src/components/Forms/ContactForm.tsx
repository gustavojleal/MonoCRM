import React from 'react';
import { useLocation } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';
import { contactFormConfig } from './schema/contactFormConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import FormBuilder from '../core/FormBuilder';

interface ContactFormProps {
  onSave?: (data: any) => void;
  isSaving?: boolean;
  onEdit?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, isSaving = true}) => {
  const location = useLocation();
  const contact = location.state?.contact;
  console.log("contact", contact);

  const methods = useDynamicForm(contactFormConfig, contact);

  const onSubmit = (data: any) => {
    const newContact = ContactService.create(data);
    if (onSave) onSave(newContact);
  };

  return (
    <div className="contact-form-container">
      <h2>Create New Contact</h2>
      <FormBuilder
        formTitle="contact_form"
        formConfig={contactFormConfig}
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default ContactForm;