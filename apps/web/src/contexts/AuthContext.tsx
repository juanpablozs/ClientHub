import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../api/axios';

type User = { id: string; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  // On startup, try to refresh access token using httpOnly refresh cookie
  useEffect(() => {
    (async () => {
      try {
        const res = await api.post('/api/auth/refresh');
        if (res.data?.accessToken) {
          setTokenState(res.data.accessToken);
          setUser(res.data.user || null);
        }
      } catch (err) {
        // no-op
      }
    })();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await api.post('/api/auth/login', { email, password });
    setTokenState(res.data.accessToken);
    setUser(res.data.user);
    setLoading(false);
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    const res = await api.post('/api/auth/register', { name, email, password });
    setTokenState(res.data.accessToken);
    setUser(res.data.user);
    setLoading(false);
  }

  async function logout() {
    await api.post('/api/auth/logout');
    setTokenState(null);
    setUser(null);
  }

  function setToken(t: string | null) {
    setTokenState(t);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
