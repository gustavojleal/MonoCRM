import React, { useState, useEffect } from 'react';
import { AppLayout } from '../layouts/AppLayout';
// import NotificationContainer from '../components/core/Notifications';
import { ContactService } from '../services/ContactService';
// import { useNotification } from '../context/NotificationContext';
import ContactItem from '../components/ContactItem';
import { Contact } from '../types/types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  // const { showNotification } = useNotification();

  const fetchContacts = async () => {
    try {
      const data = await ContactService.getAll();
      setContacts(data);
    } catch (error) {
      // showNotification('Erro ao buscar contatos.', 'error');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AppLayout>

      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Contatos</h1>
        {contacts.length === 0 ? (
          <p>Nenhum contato encontrado.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Telefone</th>
                <th className="py-2 px-4 border-b">Empresa</th>
                <th className="py-2 px-4 border-b">Cargo</th>
                <th className="py-2 px-4 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
};

export default ContactList;