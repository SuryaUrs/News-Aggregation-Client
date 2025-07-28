import axios from 'axios';
import { localStorageConstants } from '../../constants/localStorage.constant';
import { ROUTE_PATHS } from '../../constants/apiEndpoints';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    config => {
    const token = sessionStorage.getItem(localStorageConstants.ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
  async error => {
    if (error.response?.status === 401) {
      // Optional: trigger logout or refresh logic
      sessionStorage.clear();
      window.location.href = ROUTE_PATHS.LOGIN;
    }
    return Promise.reject(error);
  }
);