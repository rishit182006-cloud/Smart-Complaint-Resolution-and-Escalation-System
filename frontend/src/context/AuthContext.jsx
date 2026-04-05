import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Attempt to load initial user state from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we might verify the token here
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Map 'id' from backend to '_id' for context
    const userToStore = {
      _id: userData.id || userData._id,
      role: userData.role,
      name: userData.name,
      email: userData.email,
    };
    
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('token', token);
    // Legacy support for older components
    localStorage.setItem('userRole', userToStore.role);
    localStorage.setItem('userName', userToStore.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
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
