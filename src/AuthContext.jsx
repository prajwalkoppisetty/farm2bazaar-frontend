import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext(null);

const backendUrl = 'https://farm2bazaar-backend.onrender.com/';

const api = axios.create({
  baseURL: backendUrl,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'farmer' or 'retailer'

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUser = Cookies.get('user');
    const storedRole = Cookies.get('userRole');

    if (token && storedUser && storedRole) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
  }, []);

  const login = (userData, role, token) => {
    setIsLoggedIn(true);
    setUser(userData);
    setUserRole(role);
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    Cookies.set('userRole', role, { expires: 7 });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserRole(null);
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('userRole');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userRole, login, logout, api, backendUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};