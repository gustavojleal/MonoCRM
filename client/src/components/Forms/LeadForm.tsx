import React from 'react';
import { leadFormConfig } from './schema/leadFormConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import { LeadService } from '../../services/api';
import { Lead } from '../../types/types';
import FormBuilder from '../core/FormBuilder';

interface LeadFormProps {
  onSave?: (data: Lead) => void;
  isSaving?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSave, isSaving = true }) => {
  const methods = useDynamicForm(leadFormConfig);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log('Form Data:', data);
      const savedLead = await LeadService.create(data as Lead);
      if (onSave) onSave(savedLead);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  });


  return (
    <div className="lead-form-container">
      <h2>Create New Lead</h2>
      <FormBuilder
        formTitle="lead_form"
        formConfig={leadFormConfig}
        methods={methods}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LeadForm;

