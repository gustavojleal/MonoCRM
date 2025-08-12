import React from 'react';
import { AppLayout } from '../layouts/AppLayout';
import PageHeader from '../components/core/PageHeader';


const ContactPage: React.FC = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Criar Novo Contact"
        breadcrumbs={[{ label: 'New Contact', href: '/createContact' }, { label: 'Contact', href: '/ContactList' }]}
        description="Preencha os detalhes do lead para iniciar o processo de vendas."

      />

      <div className="max-w-4xl mx-auto p-4">


        <div className="mt-8">
          <h3 className="text-lg font-medium">Ações Rápidas</h3>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactPage;

