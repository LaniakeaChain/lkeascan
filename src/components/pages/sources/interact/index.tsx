import { ethers } from 'ethers';
import React, { useContext } from 'react';

import { WalletContext } from 'components/wallet';
import { OnboardingButton } from 'components/wallet/onboarding';
import { EpirusProvider } from 'eth/epirusProvider';
import { RawAbi } from 'utils/abi';

import { Functions, ReadFunctions, WriteFunctions } from './functions';

export enum InteractionMode {
  READ,
  WRITE,
  ALL,
}

interface Props {
  contractAddress: string;
  abi: RawAbi;
  mode: InteractionMode;
}

function AbiViewer({ abi, contractAddress, mode }: Props) {
  const { provider } = useContext(WalletContext);

  if (InteractionMode.READ === mode) {
    const epi = new EpirusProvider();
    return (
      <>
        <h3 className="--mt-24">Functions</h3>
        <Functions
          abi={abi}
          contractAddress={contractAddress}
          provider={epi}
          functionFilter={ReadFunctions}
        />
      </>
    );
  }

  // Has an associated Signer
  const ethProvider = new ethers.providers.Web3Provider(provider);
  return (
    <>
      <OnboardingButton />
      <h3 className="--mt-24">Functions</h3>
      <Functions
        abi={abi}
        contractAddress={contractAddress}
        provider={ethProvider}
        functionFilter={WriteFunctions}
      />
    </>
  );
}

export default AbiViewer;
