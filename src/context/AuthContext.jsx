import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Load auth state from localStorage on initialization
    const savedAuth = localStorage.getItem('shopzone_auth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // Sync auth state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopzone_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
