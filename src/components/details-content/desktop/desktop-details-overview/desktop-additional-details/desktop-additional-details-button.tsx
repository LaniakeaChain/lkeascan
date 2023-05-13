import React from 'react';

import { AdditionalDetailsDropdownArrow } from 'components/details-content/common/additional-details-dropdown-arrow';
import { DARK_PURPLE } from 'data/data-style';

interface Props {
  isAdditionalDetailsOpen: boolean;
  onClick(): void;
  title?: string;
  marginTop?: string;
}

export function DesktopAdditionalDetailsButton(props: Props) {
  const { isAdditionalDetailsOpen, marginTop, onClick, title } = props;
  return (
    <>
      <style jsx>{`
        button.DesktopAdditionalDetailsButton {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: ${marginTop || '48px'};
        }
        span.text {
          color: ${DARK_PURPLE};
          font-size: 12px;
          line-height: 20px;
          margin-right: 8px;
        }
      `}</style>
      <button onClick={onClick} className="DesktopAdditionalDetailsButton">
        <span className="text">{title || 'Additional Details'}</span>
        <AdditionalDetailsDropdownArrow isOpen={isAdditionalDetailsOpen} />
      </button>
    </>
  );
}
