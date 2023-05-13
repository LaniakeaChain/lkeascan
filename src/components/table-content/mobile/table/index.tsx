import React from 'react';

import { ErrorMessage } from 'components/placeholders/error-message';
import { COMBINED_LOOKUP } from 'data/table-lookup';
import { IHeaderItem } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

import { TableMobileItem } from './table-mobile-item';

interface ITableMobileItemsProps {
  dataRows: any[];
  headerItems: IHeaderItem[];
  isZeroElements: boolean;
  type: EPageType;
}

export function TableMobileItems({
  dataRows,
  headerItems,
  isZeroElements,
  type,
}: ITableMobileItemsProps) {
  return (
    <>
      <style jsx>{`
        ul.TableMobileItems {
          width: 100%;
          list-style-type: none;
        }
      `}</style>
      {isZeroElements && <ErrorMessage>No results found for current filters.</ErrorMessage>}
      <ul className="TableMobileItems">
        {dataRows.map((row: any, index: number) => (
          <TableMobileItem
            key={`${row.hash || row.address || row.metadataFileId}-${index}`}
            type={type}
            row={row}
            headerItems={headerItems.filter((item: IHeaderItem) =>
              defined(COMBINED_LOOKUP[type][item.headerType]),
            )}
          />
        ))}
      </ul>
    </>
  );
}
