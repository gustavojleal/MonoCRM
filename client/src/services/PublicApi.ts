import axios from 'axios';


const API_URL = 'http://localhost:5000/api';

const publicApi = axios.create({
  baseURL: API_URL,
});


publicApi.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



publicApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

export default publicApi;
