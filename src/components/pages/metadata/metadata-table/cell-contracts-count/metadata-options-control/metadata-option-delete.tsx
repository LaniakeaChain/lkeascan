import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { mutate } from 'swr';

import { Modal } from 'components/modal';
import { ACTIVE_BUTTON_GREY, BUTTON_GREY, HOVER_BUTTON_GREY, MOBILE_TEXT } from 'data/data-style';
import { EFetchState } from 'models/models-async';
import { EModalButtonType } from 'models/models-buttons';
import { fetchData } from 'utils/api/queries';

interface Props {
  name: string;
  metadataFileId: string;
  onClose?(): void;
}

function MetadataOptionDelete(props: Props) {
  const { metadataFileId, name, onClose } = props;
  const [deleteDataState, setDeleteState] = useState(EFetchState.None);
  const [isModal, setModal] = useState(false);

  const openModal = useCallback(() => {
    setModal(true);
    onClose();
  }, [onClose]);

  const closeModal = useCallback(() => setModal(false), []);

  const handleDeleteClick = useCallback(() => {
    setDeleteState(EFetchState.Fetching);

    fetchData(`/metadata/${metadataFileId}`, { method: 'DELETE' })
      .then(() => setDeleteState(EFetchState.Success))
      .catch(() => setDeleteState(EFetchState.Error));
  }, [metadataFileId]);

  useEffect(() => {
    if (deleteDataState === EFetchState.Success) {
      closeModal();
    }

    if (deleteDataState === EFetchState.Error || deleteDataState === EFetchState.Success) {
      mutate('/metadata');
    }
  }, [closeModal, deleteDataState]);

  return (
    <>
      <style jsx>{`
        button.MetadataOptionDelete {
          position: relative;
          padding: 8px 16px;
          text-align: left;
          width: 100%;
        }
        button.MetadataOptionDelete:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        button.MetadataOptionDelete:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }
        span {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_TEXT};
          cursor: pointer;
        }
        div.text {
          padding: 0 24px 24px;
          font-size: 14px;
          line-height: 20px;
          border-bottom: 1px solid ${BUTTON_GREY};
        }
      `}</style>
      <button onClick={openModal} className="MetadataOptionDelete">
        Delete
      </button>
      {isModal && (
        <>
          {createPortal(
            <Modal
              style={{
                width: 560,
              }}
              title="Delete metadata?"
              onClose={deleteDataState !== EFetchState.Fetching ? closeModal : undefined}
              buttonsConfig={[
                {
                  text: 'Cancel',
                  onClick: closeModal,
                  type: EModalButtonType.GhostSquare,
                  style: { padding: '7px 12px' },
                  disabled: deleteDataState === EFetchState.Fetching,
                },
                {
                  text:
                    deleteDataState === EFetchState.None
                      ? 'Delete'
                      : deleteDataState === EFetchState.Fetching
                      ? 'Deleting...'
                      : deleteDataState === EFetchState.Success
                      ? 'Deleted'
                      : 'Error',
                  disabled: deleteDataState !== EFetchState.None,
                  onClick: handleDeleteClick,
                  type: EModalButtonType.BlueSquare,
                  style: { boxShadow: 'none' },
                },
              ]}
            >
              <div className="text">
                <p>
                  Are you sure you want to delete <b>{name}</b> metadata?
                </p>
              </div>
            </Modal>,
            document.body,
          )}
        </>
      )}
    </>
  );
}

export default MetadataOptionDelete;
