import axios from 'axios';

const TOKEN_KEY = 'accessToken';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // ← подставь свой адрес
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: подставляем Bearer-токен
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: ловим 401/403 и чистим токен
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      // при необходимости — редирект на /login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);