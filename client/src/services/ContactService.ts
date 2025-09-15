import api from './AuthedApi';
import { Contact } from '../common/types/types';

export const ContactService = {
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get<Contact[]>('/contacts');
    return response.data;
  },

  getById: async (id: string): Promise<Contact> => {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  create: async (ContactData: Contact): Promise<Contact>  => {
    try {
      const response = await api.post<Contact>('/contacts', ContactData);
  
      return response.data
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  update: async (id: string, ContactData: Partial<Contact>): Promise<Contact> => {
    const response = await api.put<Contact>(`/contacts/${id}`, ContactData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`); 
  }
};
