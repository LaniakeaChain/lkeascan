import fetch from 'isomorphic-unfetch';
import React from 'react';

import SourcifyFileUploader from 'components/inputs/sourcify-uploader';
import { CHAIN_ID, SOURCIFY_URL } from 'data/data-fetch';
import { fetchBytecodes } from 'utils/api/sources';

interface Props {
  contractAddress: string;
  onSuccess(results: any);
}

export function SourceCodeVerification({ contractAddress, onSuccess }: Props) {
  async function handleVerification(data) {
    const response = {
      status: 'error',
    };

    const bytecodes = await fetchBytecodes(contractAddress);

    // TODO: check more than 1 metadata.json per validation?
    const verifyBody = { ...data, deployedMap: {} };

    const sourceFile = verifyBody.files.find((f) => f.endsWith('.sol'));
    const contract = verifyBody.contracts.find((c) => c.compiledPath.endsWith(sourceFile));

    if (contract) {
      contract.address = contractAddress;
      contract.chainId = CHAIN_ID;

      verifyBody.deployedMap[contractAddress] = {
        bytecode: bytecodes.deployedCode,
        creationData: bytecodes.creationData,
      };

      const verifyRs = await fetch(`${SOURCIFY_URL}/verify-bytecode`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyBody),
      });

      const results = await verifyRs.json();
      const contractResults = results.contracts.find((c) => c.address === contractAddress);

      if (contractResults) {
        return contractResults;
      }
    }

    return response;
  }

  return <SourcifyFileUploader onVerification={handleVerification} onSuccess={onSuccess} />;
}
