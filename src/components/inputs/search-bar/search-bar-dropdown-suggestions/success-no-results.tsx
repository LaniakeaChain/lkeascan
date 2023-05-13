import React from 'react';

import { MOBILE_GREY_TEXT } from 'data/data-style';

export function SearchBarSuccessNoResults() {
  return (
    <>
      <style jsx>{`
        div.SearchBarSuccessNoResults {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 64px);
        }
        span {
          font-size: 14px;
          line-height: 20px;
          color: ${MOBILE_GREY_TEXT};
          width: 174px;
        }
      `}</style>
      <div className="SearchBarSuccessNoResults">
        <span>We couldn’t find a match. Please try another search.</span>
      </div>
    </>
  );
}
