import React, { createContext, useContext, useEffect, useState } from 'react';

const IsFirstAppRenderContext = createContext(true);

export const IsFirstAppRenderContextProvider = ({ children }) => {
  const [firstAppRender, setFirstAppRender] = useState(true);

  useEffect(() => {
    setFirstAppRender(false);
  }, []);

  return (
    <IsFirstAppRenderContext.Provider value={firstAppRender}>
      {children}
    </IsFirstAppRenderContext.Provider>
  );
};

export const useIsFirstAppRender = () => useContext(IsFirstAppRenderContext);
