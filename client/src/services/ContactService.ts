import api from './PublicApi';
import { Contact } from '../types/types';

export const ContactService = {
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get<Contact[]>('/contacts');
    return response.data;
  },

  getById: async (id: number): Promise<Contact> => {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  create: async (ContactData: Contact): Promise<Contact> => {
    const response = await api.post<Contact>('/contacts', ContactData);
    return response.data; 
  },

  update: async (id: number, ContactData: Partial<Contact>): Promise<Contact> => {
    const response = await api.put<Contact>(`/contacts/${id}`, ContactData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/contacts/${id}`); 
  }
};
