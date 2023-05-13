import React from 'react';

import { DESKTOP_WIDTH } from 'data/data-style';
import { formatWithCommas } from 'utils/format';

interface Props {
  isArrows: boolean;
  max: number;
  min: number;
  totalRows: number;
}

export function RowsDisplayedInfo({ isArrows, max, min, totalRows }: Props) {
  return (
    <>
      <style jsx>{`
        div.RowsDisplayedInfo {
          font-size: 14px;
          line-height: 22px;
          margin-right: ${isArrows ? 28 : 0}px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.RowsDisplayedInfo {
            margin-right: ${isArrows ? 43 : 12}px;
            line-height: 16px;
          }
        }
      `}</style>
      <div className="RowsDisplayedInfo">
        {`${formatWithCommas(min, 0)}-${formatWithCommas(max, 0)} of ${formatWithCommas(
          totalRows,
          0,
        )}`}
      </div>
    </>
  );
}
