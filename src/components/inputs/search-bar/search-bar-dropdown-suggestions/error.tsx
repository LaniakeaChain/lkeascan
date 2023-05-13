import React from 'react';

import { ICON } from 'components/svg';
import { FAINT_GREY } from 'data/data-style';

export function SearchBarDropdownError() {
  return (
    <>
      <style jsx>{`
        div.SearchBarDropdownError {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 24px 0;
        }
        span {
          margin-left: 8px;
          font-size: 16px;
          line-height: 24px;
          color: ${FAINT_GREY};
        }
      `}</style>
      <div className="SearchBarDropdownError">
        {ICON.ErrorCross}
        <span>Something went wrong</span>
      </div>
    </>
  );
}
