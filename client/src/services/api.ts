import axios, { AxiosInstance } from 'axios';
import {
  Account,
  Contact,
  Task,
  Deal,
  Product,
  Lead,
  CreateTaskPayload,
  UpdateTaskPayload
} from '../types/types';

const API_URL = 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const LeadService = {
  getAll: async (): Promise<Lead[]> => {
    const response = await api.get<Lead[]>('/leads');
    return response.data;
  },

  getById: async (id: number): Promise<Lead> => {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  create: async (leadData: Lead): Promise<Lead> => {
    const response = await api.post<Lead>('/leads', leadData);
    return response.data; 
  },

  update: async (id: number, leadData: Partial<Lead>): Promise<Lead> => {
    const response = await api.put<Lead>(`/leads/${id}`, leadData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/leads/${id}`); 
  }
};

export const TaskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  create: async (taskData: CreateTaskPayload): Promise<Task> => {
    const response = await api.post<Task>('/tasks', taskData);
    return response.data;
  },

  update: async (id: number, taskData: UpdateTaskPayload): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

// Serviços para outras entidades (padrão similar)
export const AccountService = { /* ... */ };
export const ContactService = { /* ... */ };
export const DealService = { /* ... */ };
export const ProductService = { /* ... */ };