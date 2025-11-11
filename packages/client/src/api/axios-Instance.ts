import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request Interceptor: Automatically attach the auth token from local storage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ct-token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    const originalRequest = err.config;
    // Handle 401 errors and retry methanism...
    return Promise.reject(err);
  }
);

export default API;
