import fetch from 'isomorphic-unfetch';
import React, { useState } from 'react';

import { Alert } from 'components/placeholders/alert';
import { LoadingSpinnerCentered } from 'components/placeholders/loading-spinner';
import { Segment } from 'components/segments';
import { CHAIN_ID, SOURCIFY_FILES_PATH, SOURCIFY_URL } from 'data/data-fetch';
import { TEXT_GREY } from 'data/data-style';
import { IContractSources } from 'models/models-contract-code';
import { IBytecodes } from 'models/models-details-contracts';
import { uploadMetadataFile } from 'utils/api/metadata';
import { fetchBytecodes } from 'utils/api/sources';
import { toErrorMessage } from 'utils/errors';
import { useAsyncEffect } from 'utils/lifecycles';

import { SourceCodeVerification } from '../code-verification';

import { SourceCodeView } from './code-view';

interface Props {
  contractAddress: string;
}

async function fetchFiles(contractAddress: string) {
  return fetch(`${SOURCIFY_URL}/${SOURCIFY_FILES_PATH}/${CHAIN_ID}/${contractAddress}`);
}

export function SourcesDetails({ contractAddress }: Props) {
  const [contractSources, setContractSources] = useState<IContractSources>(null);
  const [bytecodes, setBytecodes] = useState<IBytecodes>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(fetchContractSources, [contractAddress]);

  async function fetchContractSources() {
    try {
      const filesRs = await fetchFiles(contractAddress);

      if (filesRs.ok) {
        const all = await filesRs.json();
        const sources = [];
        let meta = '';

        all.files.forEach((file) => {
          if (file.name === 'metadata.json') {
            meta = JSON.parse(file.content);
          } else {
            sources.push({ name: file.name, label: file.name, text: file.content });
          }
        });

        if (sources.length > 0 && meta !== '') {
          setContractSources({
            sources,
            metadata: meta,
          });
        }
      }

      setBytecodes(await fetchBytecodes(contractAddress));
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }

    setLoading(false);
  }

  async function handleSuccess() {
    try {
      const filesRs = await fetchFiles(contractAddress);

      if (filesRs.ok) {
        const all = await filesRs.json();
        const meta = all.files.find((f) => f.name === 'metadata.json');
        const metaBlob = new Blob([meta.content], { type: 'text/json' });
        await uploadMetadataFile(new File([metaBlob], 'metadata.json'));
      }
    } catch (error) {
      // console.log(error);
    }
  }

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '72px' }}>
        <LoadingSpinnerCentered />
      </div>
    );
  }

  if (errorMessage) {
    return <Alert>{errorMessage}</Alert>;
  }

  return (
    <>
      {!contractSources && (
        <>
          <h4 style={{ color: TEXT_GREY, fontWeight: 'bold' }}>
            Contract source code not verified
          </h4>
          <Segment title="Solidity Source Verification" isOpen={true}>
            <SourceCodeVerification contractAddress={contractAddress} onSuccess={handleSuccess} />
          </Segment>
        </>
      )}
      <SourceCodeView
        contractAddress={contractAddress}
        contractSources={contractSources}
        bytecodes={bytecodes}
      />
    </>
  );
}
