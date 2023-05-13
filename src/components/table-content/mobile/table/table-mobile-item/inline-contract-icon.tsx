import React from 'react';

import { ICON } from 'components/svg';
import { LIGHT_PURPLE_BUTTON, LIGHT_PURPLE_TEXT } from 'data/data-style';

export function InlineContractIcon() {
  return (
    <>
      <style jsx>{`
        div.InlineContractIcon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${LIGHT_PURPLE_BUTTON};
          color: ${LIGHT_PURPLE_TEXT};
          height: 18px;
          width: 18px;
          border-radius: 9px;
        }
      `}</style>
      <div className="InlineContractIcon">{ICON.ContractSmallIcon}</div>
    </>
  );
}
