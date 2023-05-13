import React, { useState } from 'react';

import { TextViewerModal } from './text-viewer-modal';

interface Props {
  title: string;
  children: string;
}

export function TextViewerWrapper(props: Props) {
  const [isOpen, toggleOpen] = useState(false);
  const { children, title } = props;
  return (
    <>
      <style jsx>{`
        button.toggle {
          font-size: 12px;
          line-height: 32px;
        }
      `}</style>
      <button className="toggle --text-link" onClick={() => toggleOpen(!isOpen)}>
        View
      </button>
      {isOpen && (
        <TextViewerModal title={title} onOkClick={() => toggleOpen(!isOpen)}>
          {children}
        </TextViewerModal>
      )}
    </>
  );
}
