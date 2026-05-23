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
      api
        .get('/auth/me')
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

  const _setAuth = (data) => {
    const { token, ...userData } = data;
    localStorage.setItem('worknai_token', token);
    localStorage.setItem('worknai_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return _setAuth(res.data.data);
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    return _setAuth(res.data.data);
  };

  const googleLogin = async (credential) => {
    const res = await api.post('/auth/google', { credential });
    return _setAuth(res.data.data);
  };

  const logout = () => {
    localStorage.removeItem('worknai_token');
    localStorage.removeItem('worknai_user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isHR = user?.role === 'hr';
  const isUser = user?.role === 'user';
  const can = (...roles) => roles.includes(user?.role);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, googleLogin, logout, isAdmin, isManager, isHR, isUser, can }}
    >
      {children}
    </AuthContext.Provider>
  );
};
