import React from 'react';

import { ErrorMessage } from 'components/placeholders/error-message';
import { IHeaderItem, TTableFetch } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { ITableFetchConfig } from 'models/models-table-general';

import { TablePagination } from '../table-pagination';

import { TableMobileItems } from './table';
import { TableMobileWrapper } from './table/table-mobile-wrapper';

type Props = {
  data: Partial<TTableFetch>;
  headerItems: IHeaderItem[];
  isFilterSet: boolean;
  loading?: boolean;
  limit?: number;
  noElementsMessage: string;
  tableFetchConfig?: ITableFetchConfig;
  type: EPageType;
};

export function TableMobile({
  data,
  headerItems,
  isFilterSet,
  limit,
  loading,
  noElementsMessage,
  tableFetchConfig,
  type,
}: Props) {
  const isZeroElements = data.paging ? data.paging.totalElements === 0 : data.data.length === 0;
  return (
    <TableMobileWrapper
      type={type}
      limit={limit}
      paging={data.paging}
      headerItems={headerItems}
      isZeroElements={isZeroElements}
      isFilterSet={isFilterSet}
      loading={loading}
      {...tableFetchConfig}
    >
      <>
        {!isFilterSet && isZeroElements ? (
          <ErrorMessage>{noElementsMessage}</ErrorMessage>
        ) : (
          <TableMobileItems
            isZeroElements={isZeroElements}
            type={type}
            headerItems={headerItems}
            dataRows={data.data}
          />
        )}
        <>
          {tableFetchConfig &&
            tableFetchConfig.pageNumberConfig &&
            tableFetchConfig.rowsDisplayedConfig &&
            data.paging && (
              <TablePagination
                isMobile
                paging={data.paging}
                pageNumberConfig={tableFetchConfig.pageNumberConfig}
                rowsDisplayedConfig={tableFetchConfig.rowsDisplayedConfig}
              />
            )}
        </>
      </>
    </TableMobileWrapper>
  );
}
