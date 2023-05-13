import React from 'react';

import { DARK_PURPLE } from 'data/data-style';
import { IHeaderItem } from 'models/models-data-general';
import { EPageType } from 'models/models-general';

import { TableDataRow } from './table-data-row';

interface Props {
  dataRows: any[];
  headerItems: IHeaderItem[];
  type: EPageType;
}

export function TableData({ dataRows, headerItems, type }: Props) {
  return (
    <>
      <style jsx>{`
        tbody.TableData {
          display: table-row-group;
          position: relative;
          margin-top: 16px;
          z-index: 0;
        }
        h2 {
          color: ${DARK_PURPLE};
          font-size: 28px;
          line-height: 34px;
        }
        div {
          color: ${DARK_PURPLE};
          font-size: 14px;
          line-height: 22px;
          margin-top: 24px;
        }
        table {
          font-weight: 400;
          margin-top: 36px;
        }
      `}</style>
      <tbody className="TableData">
        {dataRows.map((row: any, index: number) => (
          <TableDataRow
            key={`${row.hash || row.address || row.metadataFileId}-${index}`}
            index={index}
            type={type}
            data={row}
            headerItems={headerItems}
          />
        ))}
      </tbody>
    </>
  );
}
