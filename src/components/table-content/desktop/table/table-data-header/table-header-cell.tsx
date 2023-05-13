import React from 'react';

import { GREY, PAGINATION_GREY } from 'data/data-style';
import { THeaderType } from 'models/models-data-general';

interface Props {
  headerType: THeaderType;
  isTab: boolean;
}

export function TableHeaderCell({ headerType, isTab }: Props) {
  return (
    <>
      <style jsx>{`
        th {
          position: relative;
          color: ${isTab ? GREY : PAGINATION_GREY};
          font-weight: 400;
          font-size: 14px;
          text-align: left;
          font-weight: 500;
        }
      `}</style>
      <th>
        <span>{headerType}</span>
      </th>
    </>
  );
}
