import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ContactService } from '../services/ContactService';
import ContactItem from '../components/ContactItem';
import { Contact } from '../types/types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const data = await ContactService.getAll();
      setContacts(data);
    } catch (error) {
      // showNotification('Erro ao buscar contatos.', 'error');
    }
  };

  const HandlerEdit = (contact: Contact) => {
    navigate(`/CreateContact`, { state: { contact } });
   
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AppLayout>

      <div className="container">
        <h1 className="title">Lista de Contatos</h1>
        {contacts.length === 0 ? (
          <p>Nenhum contato encontrado.</p>
        ) : (
            <table className="contact-table">
            <thead>
              <tr>
                <th className="column name">Nome</th>
                <th className="column phone">Telefone</th>
                <th className="column cia">Empresa</th>
                <th className="column job">Cargo</th>
                <th className="column created">Criado</th>
                <th className="column updated">Atualizado</th>
                <th className="column status">Status</th>
                {/* <th className="py-2 px-4 border-b">Ações</th> */}
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <ContactItem index={index + 1} key={contact.id} contact={contact} onEdit={HandlerEdit} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
};

export default ContactList;

