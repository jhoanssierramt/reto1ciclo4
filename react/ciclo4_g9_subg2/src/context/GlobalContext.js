import React, { createContext } from "react";

const context = createContext();

const GlobalContext = ({ children }) => {
  return <context.Provider>{children}</context.Provider>;
};

export default GlobalContext;
