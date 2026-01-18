import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

instance.interceptors.request.use((config) => {
  if (accessToken) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${accessToken}` };
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

async function refreshToken() {
  try {
    const res = await instance.post('/api/auth/refresh');
    return res.data.accessToken as string;
  } catch (err) {
    return null;
  }
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response && error.response.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            original.headers.Authorization = token ? `Bearer ${token}` : undefined;
            resolve(instance(original));
          });
        });
      }
      original._retry = true;
      isRefreshing = true;
      const token = await refreshToken();
      setAccessToken(token);
      isRefreshing = false;
      refreshQueue.forEach((cb) => cb(token));
      refreshQueue = [];
      if (token) original.headers.Authorization = `Bearer ${token}`;
      return instance(original);
    }
    return Promise.reject(error);
  }
);

export default instance;
