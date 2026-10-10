import axios from 'axios';

export function apiClient(getToken) {
  const client = axios.create({ baseURL: '/api' });
  client.interceptors.request.use(async config => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return client;
}
