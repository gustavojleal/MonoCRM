import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import PageHeader from '../components/core/PageHeader';
import NotificationContainer from '../components/core/Notifications';
import LeadForm from '../components/Forms/LeadForm';
import { useLeadCreation } from '../hooks/useLeadCreation';
import { useNotification } from '../app/core/NotificationContext';


export const LeadPage: React.FC = () => {
  const { createLead, isLoading } = useLeadCreation();
  const { notifications, removeNotification } = useNotification();

  return (
    <AppLayout>
      <PageHeader
        title="Criar Novo Lead"
        breadcrumbs={[{ label: 'Leads', href: '/leads' }, { label: 'Novo Lead' }]}
      />

      <div className="max-w-4xl mx-auto p-4">
        <NotificationContainer
          notifications={notifications}
          removeNotification={removeNotification}
          autoClose={true}
          autoCloseDuration={4000}
        />

        <LeadForm
          onSave={createLead}
          isSaving={isLoading}
        />

        <div className="mt-8">
          <h3 className="text-lg font-medium">Ações Rápidas</h3>
          {/* Componentes adicionais específicos da página */}
        </div>
      </div>
    </AppLayout>
  );
};

