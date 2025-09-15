import React from 'react';
import { leadFormConfig } from './schema/leadFormConfig';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import { LeadService } from '../../services/PublicApi';
import { Lead } from '../../common/types/types';
import FormBuilder from '../core/FormBuilder';
import NotificationContainer from '../core/Notifications';
import { useNotification } from '../../context/NotificationContext';

interface LeadFormProps {
  onSave?: (data: Lead) => void;
  isSaving?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSave, isSaving = true }) => {
  const { notifications, removeNotification, addNotification } = useNotification();
  const methods = useDynamicForm(leadFormConfig);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const savedLead = await LeadService.create(data as Lead);
      addNotification({
        type: 'success',
        title: 'Sucesso!',
        message: 'Lead criado com sucesso.',
      });
      if (onSave) onSave(savedLead);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Erro ao salvar lead',
        message: error instanceof Error ? error.message : 'Ocorreu um erro ao salvar o lead.',
      });
    }
  });


  return (
    <>
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
        autoClose={true}
        autoCloseDuration={4000}
      />
      <div className="lead-form-container">
        <h2>Create New Lead</h2>
        <FormBuilder
          formTitle="lead_form"
          formConfig={leadFormConfig}
          methods={methods}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default LeadForm;

