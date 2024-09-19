import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [agencyEmail, setAgencyEmail] = useState('');

  return (
    <GlobalContext.Provider value={{ agencyEmail, setAgencyEmail }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
