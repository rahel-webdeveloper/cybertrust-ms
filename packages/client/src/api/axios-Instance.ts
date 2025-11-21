/* eslint-disable @typescript-eslint/no-unused-vars */
import { toaster } from '@/components/ui/toaster';
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ct-token');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    else config.headers.Authorization = '';

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response Interceptor: Handle token expiration and refresh
API.interceptors.response.use(
  (response) => response,
  async (err) => {
    // const originalRequest = err.config;
    // Handle 401 errors and retry methanism...
    if (err.response && err.response.status === 401) {
      // localStorage.removeItem('ct-token');
      // toaster.create({
      //   title: 'Unauthorized',
      //   description:
      //     'It looks like something went wrong, please login again or go home page.',
      //   type: 'error',
      //   closable: true,
      //   duration: 3000,
      // });
    }
    if (err.response && err.response.status === 404)
      toaster.create({
        title: 'Network Error',
        description: 'Check your internet connection.',
        type: 'error',
        closable: true,
        duration: 3000,
      });

    return Promise.reject(err);
  }
);

export default API;
