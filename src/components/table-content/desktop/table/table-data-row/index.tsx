import React from 'react';

import { COMBINED_LOOKUP } from 'data/table-lookup';
import { IHeaderItem } from 'models/models-data-general';
import { EPageType } from 'models/models-general';

import { CellTableData } from './cell-table-data';

export const ROW_HEIGHT = 58;

interface Props {
  data: any;
  headerItems: IHeaderItem[];
  index: number;
  type: EPageType;
}

export function TableDataRow({ data, headerItems, index, type }: Props) {
  return (
    <>
      <style jsx>{`
        tr.TableDataRow {
          height: ${ROW_HEIGHT}px;
          width: 100%;
        }
        tr.TableDataRow:hover :global(.--tooltip):before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          border-bottom: 1px dotted currentColor;
        }
      `}</style>
      <tr className="TableDataRow">
        {headerItems.map((item: IHeaderItem) => (
          <CellTableData key={item.headerType} isFirstRow={index === 0}>
            {COMBINED_LOOKUP[type][item.headerType](data)}
          </CellTableData>
        ))}
      </tr>
    </>
  );
}
