import React from 'react';

import { LIGHT_GREY } from 'data/data-style';

interface Props {
  children: JSX.Element;
  isFirstRow?: boolean;
}

export function CellTableData({ children, isFirstRow }: Props) {
  return (
    <>
      <style jsx>{`
        td.isFirstRow {
          border-top: 1px solid ${LIGHT_GREY};
          border-bottom: 1px solid ${LIGHT_GREY};
        }
        td {
          position: relative;
          border-bottom: 1px solid ${LIGHT_GREY};
        }
      `}</style>
      <td className={isFirstRow ? 'isFirstRow' : ''}>{children}</td>
    </>
  );
}
