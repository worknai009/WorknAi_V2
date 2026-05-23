import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('worknai_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const path = window.location.pathname;
      if (path.startsWith('/hr') && path !== '/hr/login') {
        localStorage.removeItem('worknai_token');
        localStorage.removeItem('worknai_user');
        window.location.href = '/hr/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;