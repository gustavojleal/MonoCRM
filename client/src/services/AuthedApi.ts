import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

const authedApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

authedApi.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


authedApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
  console.log('Unauthorized request, clearing session');
    }
    return Promise.reject(error);
  }
);

export default authedApi;
