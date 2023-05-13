import React from 'react';

import { AdditionalDetailsDropdownArrow } from 'components/details-content/common/additional-details-dropdown-arrow';

interface Props {
  isAdditionalDetailsOpen: boolean;
  onClick(): void;
}

export function MobileAdditionalDetailsButton(props: Props) {
  const { isAdditionalDetailsOpen, onClick } = props;
  return (
    <>
      <style jsx>{`
        button.MobileAdditionalDetailsButton {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        span.text {
          font-size: 12px;
          line-height: 16px;
          margin-right: 5px;
        }
      `}</style>
      <button onClick={onClick} className="MobileAdditionalDetailsButton">
        <span className="text">Additional Details</span>
        <AdditionalDetailsDropdownArrow isOpen={isAdditionalDetailsOpen} />
      </button>
    </>
  );
}
