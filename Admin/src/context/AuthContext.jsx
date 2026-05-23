import { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('worknai_user');
    const token = localStorage.getItem('worknai_token');
    if (stored && token) {
      setUser(JSON.parse(stored));
      api.get('/auth/me')
        .then((res) => {
          setUser(res.data.data);
          localStorage.setItem('worknai_user', JSON.stringify(res.data.data));
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, ...userData } = res.data.data;
    if (userData.role !== 'admin') {
      throw new Error('Access denied. Admin account required.');
    }
    localStorage.setItem('worknai_token', token);
    localStorage.setItem('worknai_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('worknai_token');
    localStorage.removeItem('worknai_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
