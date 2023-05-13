import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { mutate } from 'swr';

import { Modal } from 'components/modal';
import { ELoadingSpinnerType, LoadingSpinner } from 'components/placeholders/loading-spinner';
import { ICON } from 'components/svg';
import { ACTIVE_PURPLE_TEXT_MOBILE, MAIN_TABLE_PADDING } from 'data/data-style';
import { EFetchState } from 'models/models-async';
import { EModalButtonType } from 'models/models-buttons';
import { uploadMetadataFile } from 'utils/api/metadata';
import { removeInArrayByIndex } from 'utils/array';
import { useTimeout } from 'utils/use-timeout';

import { MetadataUploadContent } from './content';
import { DropZone } from './drop-zone';

function MetadataUploadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fetchState, setFetchState] = useState(EFetchState.None);

  const [resetUploadTimeout] = useTimeout(2000);

  const handleDeleteFile = (index: number) => {
    setFileList(removeInArrayByIndex(fileList, index));
  };

  const openModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const resetUpload = () => setFetchState(EFetchState.None);

  const handleChange = useCallback(
    (files: FileList) => {
      setFileList([...fileList, ...Array.from(files)]);
    },
    [fileList],
  );

  const handleDoneClick = useCallback(() => {
    if (fileList.length > 0) {
      setFetchState(EFetchState.Fetching);

      Promise.all(fileList.map((file) => uploadMetadataFile(file)))
        .then(() => {
          setFetchState(EFetchState.Success);
          resetUploadTimeout(resetUpload);
          handleCloseModal();
        })
        .catch(() => {
          setFetchState(EFetchState.Error);
        })
        .finally(() => {
          mutate('/metadata');
        });
    }
  }, [fileList, resetUploadTimeout]);

  const isUploadDisabled = fileList.length === 0 || fetchState === EFetchState.Fetching;

  return (
    <>
      <style jsx>{`
        button.MetadataUploadButton {
          position: absolute;
          right: ${MAIN_TABLE_PADDING}px;
          top: ${MAIN_TABLE_PADDING}px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
          height: 40px;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
        }
        div.uploading-text {
          display: flex;
        }
        span.text {
          margin-left: 8px;
        }
        span.blue-text {
          color: ${ACTIVE_PURPLE_TEXT_MOBILE};
          white-space: nowrap;
        }
        p {
          max-width: 470px;
        }
        div.text {
          padding: 0 24px 20px;
          font-size: 14px;
          line-height: 20px;
        }
        p.upload-error {
          display: flex;
          margin-top: 16px;
          color: #f95e45;
        }
      `}</style>
      <button className="MetadataUploadButton --blue-square" onClick={openModal}>
        {fetchState === EFetchState.None ||
        fetchState === EFetchState.Fetching ||
        fetchState === EFetchState.Error ? (
          <>
            {ICON.Plus}
            <span className="text">Upload Metadata</span>
          </>
        ) : (
          <>
            {ICON.Tick}
            <span className="text">Uploaded!</span>
          </>
        )}
      </button>
      {isModalOpen && (
        <>
          {createPortal(
            <Modal
              style={{ width: 560 }}
              title="Upload Contract Metadata File"
              onClose={fetchState === EFetchState.Fetching ? undefined : handleCloseModal}
              buttonsConfig={[
                {
                  text: 'Cancel',
                  disabled: fetchState === EFetchState.Fetching,
                  onClick: handleCloseModal,
                  type: EModalButtonType.GhostSquare,
                  style: { padding: '7px 12px' },
                },
                {
                  text:
                    fetchState === EFetchState.Fetching ? (
                      <div className="uploading-text">
                        <LoadingSpinner
                          type={ELoadingSpinnerType.White}
                          style={{ width: 16, height: 16 }}
                        />
                        <span className="text">Uploading...</span>
                      </div>
                    ) : (
                      'Upload'
                    ),
                  disabled: isUploadDisabled,
                  onClick: handleDoneClick,
                  type: EModalButtonType.BlueSquare,
                  style: {
                    boxShadow: 'none',
                    cursor: isUploadDisabled ? 'not-allowed' : 'pointer',
                  },
                },
              ]}
            >
              <div className="text">
                <p>
                  This can be generated with the following Solidity compiler flag{' '}
                  <span className="blue-text">solc --metadata</span> and is usually called{' '}
                  <span className="blue-text">{`<ContractName>_meta.json`}</span>
                </p>
                <DropZone
                  files={fileList}
                  fetchState={fetchState}
                  onChange={handleChange}
                  onDeleteFile={handleDeleteFile}
                >
                  <MetadataUploadContent />
                </DropZone>
                {fetchState === EFetchState.Error && (
                  <p className="upload-error">One or more metadata files are invalid.</p>
                )}
              </div>
            </Modal>,
            document.body,
          )}
        </>
      )}
    </>
  );
}

export default MetadataUploadButton;
