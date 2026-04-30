import React, { createContext, useState, useContext } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState({
    id: 999,
    name: 'Super Admin',
    role: 'SYSTEM_MANAGER',
    token: 'admin_token_secure'
  });

  const login = (userData) => {
    setAdminUser(userData);
  };

  const logout = () => {
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
