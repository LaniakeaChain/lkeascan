import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

import { DesktopAdditionalDetailsButton } from 'components/details-content/desktop/desktop-details-overview/desktop-additional-details/desktop-additional-details-button';
import { Alert } from 'components/placeholders/alert';
import { LoadingSpinnerCentered } from 'components/placeholders/loading-spinner';
import { FILES } from 'components/svg/files';
import { DefinitionList } from 'components/text';
import { SOURCIFY_URL } from 'data/data-fetch';
import { HEADER_ICON_PURPLE } from 'data/data-style';
import { toErrorMessage } from 'utils/errors';
import { useAsyncEffect } from 'utils/lifecycles';

import { ButtonReset } from '../button-reset';

interface Props {
  onVerification(data: any): any;
  onSuccess(data: any);
  isDesktop?: boolean;
}

const SessionFiles = (props: any) => {
  const { data } = props;

  if (data === null || data.files.length === 0) {
    return props.children;
  }

  return (
    <>
      <style jsx>{`
        .files {
          margin-bottom: 1rem;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .files li {
          padding-right: 1rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
      <ul className="files">
        {data.files.map((f) => (
          <li key={f}>
            {FILES.GenericFile} {f}
          </li>
        ))}
      </ul>
    </>
  );
};

const AdditionalSessionDetails = (props: any) => {
  const { data } = props;

  const [isOpen, setOpen] = useState(false);

  if (data === null || data.files.length === 0 || data.contracts.length === 0) {
    return null;
  }

  return (
    <>
      <DesktopAdditionalDetailsButton
        onClick={() => setOpen(!isOpen)}
        isAdditionalDetailsOpen={isOpen}
        marginTop="1rem"
        title="Verification Details"
      />
      {isOpen && (
        <div>
          {data.contracts.map((c) => (
            <DefinitionList key={c.verificationId}>
              <dt>Id</dt>
              <dd>{c.verificationId}</dd>
              <dt>Path</dt>
              <dd>{c.compiledPath}</dd>
              {c.files.found.length > 0 && (
                <>
                  <dt>Found</dt>
                  <dd>{c.files.found.join(', ')}</dd>
                </>
              )}
              {Object.keys(c.files.missing).length > 0 && (
                <>
                  <dt>Missing</dt>
                  <dd>{Object.keys(c.files.missing).join(', ')}</dd>
                </>
              )}
              {Object.keys(c.files.invalid).length > 0 && (
                <>
                  <dt>Invalid</dt>
                  <dd>{Object.keys(c.files.invalid).join(', ')}</dd>
                </>
              )}
            </DefinitionList>
          ))}
        </div>
      )}
    </>
  );
};

function isVerifiable(data) {
  return (
    data !== null &&
    data.contracts.find(
      (c) =>
        c.files.found.length > 0 &&
        Object.keys(c.files.missing).length === 0 &&
        Object.keys(c.files.invalid).length === 0,
    )
  );
}

const VerificationError = (props) => {
  const { results } = props;
  return (
    <>
      <h3>Verification {results.status}</h3>
      <div>
        <p>Please, check that you uploaded the appropriate:</p>
        <ol>
          <li>
            Metadata JSON file. You can create the file by using the &quot;solc --metadata&quot;
            command.
          </li>
          <li>Solidity source files.</li>
        </ol>
      </div>
    </>
  );
};

const SourcifyFileUploader = (props: Props) => {
  const router = useRouter();
  const { isDesktop, onSuccess, onVerification } = props;
  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useAsyncEffect(showSessionData, []);

  async function showSessionData() {
    const sessionDataRs = await fetch(`${SOURCIFY_URL}/session-data`, {
      credentials: 'include',
    });

    const data = await sessionDataRs.json();
    setSessionData(data);
  }

  async function restartSession(update = true) {
    try {
      const sessionDataRs = await fetch(`${SOURCIFY_URL}/restart-session`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!update) {
        return;
      }

      if (sessionDataRs.ok) {
        setSessionData(null);
        setErrorMessage(null);
      } else {
        setErrorMessage(sessionDataRs.statusText);
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }
  }

  async function uploadFiles(uploadedFiles: File[]) {
    setUploading(true);

    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append('files', file, file.name);
      });

      const inputRs = await fetch(`${SOURCIFY_URL}/input-files`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (inputRs.ok) {
        await showSessionData();
      } else {
        setErrorMessage(inputRs.statusText);
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }

    setUploading(false);
  }

  async function verify() {
    setVerifying(true);

    try {
      const sessionDataRs = await fetch(`${SOURCIFY_URL}/session-data`, {
        credentials: 'include',
      });

      const verificationRs = await onVerification(await sessionDataRs.json());

      if (verificationRs.status === 'error') {
        setErrorMessage(<VerificationError results={verificationRs} />);
      } else {
        await onSuccess(verificationRs);
        await restartSession(false);
        // For the moment just reload all the page to get the metadata section as well
        router.reload();
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error));
    }

    setVerifying(false);
  }

  return (
    <>
      <style jsx>{`
        button.Verify {
          margin-top: ${isDesktop ? 12 : 18}px;
          padding: ${isDesktop ? 8 : 12}px 0;
          width: 100%;
          border-radius: 4px;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
          box-shadow: none;
          text-align: center;
        }
        button.Verify:not([disabled]):active {
          background-color: ${HEADER_ICON_PURPLE};
        }
        button.Verify[disabled] {
          cursor: default;
        }
        section.file-upload {
          border: dashed;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          border-color: rgba(0, 0, 0, 0.12);
          border-radius: 4px;
          padding: 1.15rem;
          cursor: pointer;
          min-height: 250px;
          width: 100%;
        }
        section.file-upload p {
          font-size: 18px;
          color: #bcbcbc;
        }
        .files-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
      `}</style>
      <Dropzone
        accept=".sol,application/octet-stream,application/json,application/zip,application/gzip"
        onDrop={(acceptedFiles) => uploadFiles(acceptedFiles)}
      >
        {({ getInputProps, getRootProps }) => (
          <>
            {verifying && <LoadingSpinnerCentered />}
            {!verifying && errorMessage && <Alert>{errorMessage}</Alert>}

            <div className="files-title">
              <span>Files ({sessionData === null ? 0 : sessionData.files.length})</span>{' '}
              <ButtonReset onClick={restartSession} />
            </div>

            <section className="file-upload" {...getRootProps()}>
              {uploading && <LoadingSpinnerCentered />}
              {uploading || <input {...getInputProps()} />}

              <SessionFiles data={sessionData}>
                <p>
                  Drag &#39;n&#39; drop contract metadata and solidity source files here, or click
                  to select files
                </p>
              </SessionFiles>
            </section>

            <AdditionalSessionDetails data={sessionData} />

            <button
              type="button"
              className="Verify --blue-square"
              onClick={verify}
              disabled={verifying || !isVerifiable(sessionData)}
            >
              Verify Contract Sources
            </button>
          </>
        )}
      </Dropzone>
    </>
  );
};

export default SourcifyFileUploader;
