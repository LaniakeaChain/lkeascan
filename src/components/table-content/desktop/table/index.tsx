import React from 'react';

import { ErrorMessage } from 'components/placeholders/error-message';
import { EDisplayTitleType, IHeaderItem } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

import { TableData } from './table-data';
import { TableHeader } from './table-data-header';

interface Props {
  isZeroElements: boolean;
  type: EPageType;
  headerItems: IHeaderItem[];
  dataRows: any[];
  displayTitleType: EDisplayTitleType;
}

export function Table(props: Props) {
  const { dataRows, displayTitleType, headerItems, isZeroElements, type } = props;

  return (
    <>
      <style jsx>{`
        table.Table {
          width: 100%;
          font-weight: 400;
          table-layout: fixed;
        }
      `}</style>
      <table className="Table">
        <colgroup>
          {headerItems.map((headerItem: IHeaderItem) => (
            <col
              key={headerItem.headerType}
              style={{ width: defined(headerItem.fixedWidth) ? headerItem.fixedWidth : null }}
            />
          ))}
        </colgroup>
        <TableHeader
          displayTitleType={displayTitleType}
          items={headerItems.map((item: IHeaderItem) => ({ headerType: item.headerType }))}
        />
        {!isZeroElements && <TableData type={type} dataRows={dataRows} headerItems={headerItems} />}
      </table>
      {isZeroElements && <ErrorMessage>No results found for current filters.</ErrorMessage>}
    </>
  );
}
