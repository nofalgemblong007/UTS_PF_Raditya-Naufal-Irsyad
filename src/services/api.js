import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Auto-attach JWT from localStorage if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock Logic for "Bebas Saja" / Optional Auth Mode
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = localStorage.getItem('token');
    const isDemoMode = token && token.startsWith('demo-token');

    if (isDemoMode) {
      console.warn("API Error in Demo Mode - Simulating success for UX", error.config.url);
      
      // Simulate successful responses for common endpoints
      if (error.config.method === 'get') {
        if (error.config.url.includes('/items')) return { data: { success: true, data: [] } };
        if (error.config.url.includes('/rent')) return { data: { success: true, data: [] } };
        if (error.config.url.includes('/auth/users')) return { data: { success: true, data: [] } };
      }
      
      if (error.config.method === 'post') {
        return { data: { success: true, message: "Action simulated successfully (Demo Mode)" } };
      }
    }

    // If real 401 and not demo, redirect to login
    if (error.response?.status === 401 && !isDemoMode) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
