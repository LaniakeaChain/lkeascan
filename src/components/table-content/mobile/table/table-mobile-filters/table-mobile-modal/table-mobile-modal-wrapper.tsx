import React, { useEffect, useState } from 'react';

import { useWindowSize } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

let ref;
const PADDING_X = 32;
const PADDING_Y = 24;

interface Props {
  children: JSX.Element[];
}

export function TableMobileModalWrapper({ children }: Props) {
  const windowSize = useWindowSize();
  const [contentHeight, setContentHeight] = useState('auto');

  const handleContentRef = (el) => {
    if (defined(el)) {
      ref = el;
    }
  };

  useEffect(() => {
    if (ref.clientHeight < windowSize.height) {
      setContentHeight(`${windowSize.height - PADDING_Y * 2}px`);
    }
  }, [windowSize.height]);

  return (
    <>
      <style jsx>{`
        div.TableMobileModalWrapper {
          position: relative;
          width: calc(100% - ${PADDING_X * 2}px);
          height: ${contentHeight};
          padding: ${PADDING_Y}px ${PADDING_X}px;
          z-index: 3;
        }
        div.text {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          z-index: 1;
        }
      `}</style>
      <div
        className="TableMobileModalWrapper"
        ref={handleContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text">{children}</div>
      </div>
    </>
  );
}
