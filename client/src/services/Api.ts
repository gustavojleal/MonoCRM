import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const publicApi = axios.create({
  baseURL: API_URL
});

// Instância COM credenciais para requisições autenticadas
export const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Interceptor para adicionar token após login
privateApi.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});