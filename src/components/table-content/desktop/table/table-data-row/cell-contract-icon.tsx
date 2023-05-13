import React from 'react';

import { ICON } from 'components/svg';
import { LIGHT_PURPLE_BUTTON, LIGHT_PURPLE_TEXT } from 'data/data-style';

export function CellContractIcon() {
  return (
    <>
      <style jsx>{`
        div.CellContractIcon {
          position: absolute;
          top: 50%;
          left: -6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${LIGHT_PURPLE_BUTTON};
          color: ${LIGHT_PURPLE_TEXT};
          height: 18px;
          width: 18px;
          border-radius: 9px;
          transform: translate(-100%, -50%);
        }
      `}</style>
      <div className="CellContractIcon">{ICON.ContractSmallIcon}</div>
    </>
  );
}
