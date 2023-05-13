import MetaMaskOnboarding from '@metamask/onboarding';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Alert } from 'components/placeholders/alert';
import { ErrorMessage } from 'components/placeholders/error-message';
import { ETH } from 'components/svg/eth';
import { CHAIN_ID } from 'data/data-fetch';
import { LIGHT_GREY } from 'data/data-style';
import { themed } from 'theming';

import MetaMaskAvatar from './avatar';

import { WalletContext } from '.';

const ONBOARD_TEXT = 'Install MetaMask';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function OnboardingButton() {
  const { provider } = useContext(WalletContext);

  const router = useRouter();

  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef<MetaMaskOnboarding>();

  const hexCID = `0x${Number(CHAIN_ID)
    .toString(16)
    .toLowerCase()}`;

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, [provider]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }

    function handleChainChanged(chainId) {
      if (chainId.toLowerCase() !== hexCID) {
        router.reload();
      } else {
        setNetworkError(null);
      }
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      provider.request({ method: 'eth_requestAccounts' }).then(handleNewAccounts);

      provider.on('accountsChanged', handleNewAccounts);
      provider.on('chainChanged', handleChainChanged);

      return () => {
        if (provider && provider.removeListener) {
          provider.removeListener('accountsChanged', handleNewAccounts);
          provider.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [provider, hexCID, router]);

  useEffect(() => {
    async function switchNetwork() {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexCID }],
        });

        setNetworkError(null);
      } catch (error) {
        //@ts-ignore
        if (error.code === 4902) {
          setNetworkError(themed('metamask').onboarding);
        } else {
          //@ts-ignore
          setNetworkError(`Failed to switch to the network ${CHAIN_ID}: ${error.message}`);
        }
      }

      setSwitchingNetwork(false);
    }

    if (switchingNetwork) {
      switchNetwork();
    }
  }, [switchingNetwork, hexCID, provider]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  if (networkError) {
    return (
      <Alert>
        <span dangerouslySetInnerHTML={{ __html: networkError }} />
      </Alert>
    );
  }

  if (!switchingNetwork && provider && provider.networkVersion !== CHAIN_ID) {
    setSwitchingNetwork(true);
    return null;
  }

  return (
    <>
      <style jsx>{`
        .EthAccount .Button {
          display: flex;
          align-items: center;
          border: 1px solid ${LIGHT_GREY};
          padding: 3px 8px;
          border-radius: 3px;
        }
        .Connect {
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          box-shadow: none;
          text-align: center;
          height: auto;
          min-height: 48px;
          padding: 0 16px;
        }
      `}</style>
      <div className="EthAccount">
        {accounts.length > 0 && provider.selectedAddress !== null && (
          <div>
            <h3 className="--mb-12">Account</h3>
            <div style={{ display: 'inline-block' }}>
              <MetaMaskAvatar account={provider.selectedAddress} />
            </div>
          </div>
        )}
        {accounts.length === 0 && provider !== null && (
          <button className="Button" disabled={isDisabled} onClick={onClick}>
            {ETH.Connect} {buttonText}
          </button>
        )}
      </div>
      {provider === null && (
        <>
          <ErrorMessage>
            Please, connect an Ethereum provider to interact with the smart contract.
          </ErrorMessage>
          <div className="--box-center">
            <button className="Connect --blue-square" onClick={onClick} disabled={isDisabled}>
              Connect Ethereum Wallet
            </button>
          </div>
        </>
      )}
    </>
  );
}
