import detectEthereumProvider from '@metamask/detect-provider';
import React, { createContext, useEffect, useState } from 'react';

export const WalletContext = createContext({
  provider: null,
  error: null,
});

interface Props {
  children: any;
}

export function Wallet(props: Props) {
  const [provider, setProvider] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function detect() {
      try {
        const ethereum = await detectEthereumProvider();
        setProvider(ethereum);
      } catch (e) {
        setError(e);
      }
    }

    detect();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        provider,
        error,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}
