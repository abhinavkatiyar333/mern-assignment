import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskManagerToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (payload) => api.post('/auth/register', payload);
export const login = (payload) => api.post('/auth/login', payload);
export const getTasks = () => api.get('/tasks');
export const createTask = (payload) => api.post('/tasks', payload);
export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
