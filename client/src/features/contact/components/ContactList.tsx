import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../../layouts/AppLayout';
import { fetchContacts, setSelectedContact } from '../contactsSlice';
import ContactItem from '../components/ContactItem';
import { RootState, AppDispatch } from '../../../app/store';
import { Contact } from '../types';

const ContactList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { list: contacts, loading, error } = useSelector((state: RootState) => state.contacts);

  const HandlerEdit = (contact: Contact) => {
    dispatch(setSelectedContact(contact));
    navigate(`/CreateContact`);
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

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
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <ContactItem key={contact.id} index={index + 1} contact={contact} onEdit={HandlerEdit} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
};

export default ContactList;


