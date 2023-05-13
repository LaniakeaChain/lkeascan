import React from 'react';

interface Props {
  onClose(): void;
  children: JSX.Element;
}

export function ModalWrapper({ children, onClose }: Props) {
  return (
    <>
      <style jsx>{`
        div.ModalWrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(99, 108, 130, 0.5);
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          /* This is to keep modal wrapper above the table and header*/
          /* Assumes max table rows are less than 999 */
        }
      `}</style>
      <div className="ModalWrapper" onClick={onClose}>
        {children}
      </div>
    </>
  );
}
