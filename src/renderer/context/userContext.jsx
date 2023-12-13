import { useState, createContext, useContext, Children } from 'react';

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
