import React, { createContext, useContext, useState } from 'react';

const PageTitleContext = createContext({ title: null, setTitle: null });

export const PageTitleContextProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Web3 Labs');

  return (
    <PageTitleContext.Provider value={{ title: pageTitle, setTitle: setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(PageTitleContext);
