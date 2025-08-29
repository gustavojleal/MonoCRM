import api from './AuthedApi';
import { ContactHistory } from '../types/types';

export const ContactHistoryService = {
  getByContactId: async (id: string): Promise<ContactHistory[]> => {
    const response = await api.get<ContactHistory[]>(`/contacthistory/${id}`);
    return response.data;
  },

  getById: async (id: string): Promise<ContactHistory> => {
    const response = await api.get<ContactHistory>(`/contacthistory/${id}`);
    return response.data;
  },

  create: async (id: string, historyData: ContactHistory): Promise<ContactHistory> => {
    const response = await api.post<ContactHistory>(`/contacthistory/${id}`, historyData);
    return response.data; 
  },
  
};
