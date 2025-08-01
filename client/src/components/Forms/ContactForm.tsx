import React from 'react';
import { contactFormConfig } from './schema/contactFormConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import FormBuilder from '../core/FormBuilder';

interface ContactFormProps {
  onSave?: (data: any) => void;
  isSaving?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, isSaving = true }) => {
  const methods = useDynamicForm(contactFormConfig);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
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