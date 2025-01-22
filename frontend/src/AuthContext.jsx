import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    return token && expiry && Date.now() < Number(expiry);
  });

  const [isAdmin, setAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  

  const login = (token, epin) => {
   

    localStorage.setItem('token', token);
    localStorage.setItem('epin', epin);

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        setIsAuthenticated(true);
        setAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        
        navigate('/admin/dashboard');
      } else {
        setIsAuthenticated(true);
        localStorage.setItem('isAdmin', 'false');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      logout();
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('epin');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
