import React, { useContext, useState } from "react";

const SessionContext = React.createContext();
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoged, setIsLoged] = useState(false);

  const logout = () => {
    localStorage.clear();
    setUser({});
    setIsLoged(false);
  };

  return (
    <SessionContext.Provider
      value={{ user, setUser, isLoged, setIsLoged, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useApp = () => useContext(SessionContext);
