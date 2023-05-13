import React, { useEffect, useState } from 'react';

import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { IHeaderItem, IPaging } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IMultiFilterConfig, ISortConfig } from 'models/models-table-general';
import { useTimeout } from 'utils/use-timeout';

import { TableMobileInfoHeader } from './table-mobile-info-header';

interface ITableMobileWrapperProps {
  children: JSX.Element;
  filterConfig?: IMultiFilterConfig;
  headerItems: IHeaderItem[];
  isFilterSet: boolean;
  isZeroElements: boolean;
  loading: boolean;
  paging?: IPaging;
  sortRowsConfig?: ISortConfig;
  type: EPageType;
  limit?: number;
}

export function TableMobileWrapper({
  children,
  filterConfig,
  headerItems,
  isFilterSet,
  isZeroElements,
  limit,
  loading,
  paging,
  sortRowsConfig,
  type,
}: ITableMobileWrapperProps) {
  const [isThrottledLoading, setLoading] = useState(false);

  const [loadingTimeout] = useTimeout(200);

  useEffect(() => {
    loadingTimeout(() => setLoading(loading));
  }, [loading, loadingTimeout]);

  return (
    <>
      {isThrottledLoading && (
        <LoadingSpinner
          style={{
            position: 'absolute',
            top: 26,
            right: 24,
            width: 40,
            height: 40,
            zIndex: 2,
          }}
        />
      )}
      {!(isZeroElements && !isFilterSet) && paging && (
        <TableMobileInfoHeader
          isZeroElements={isZeroElements}
          headerItems={headerItems}
          type={type}
          limit={limit}
          paging={paging}
          filterConfig={filterConfig}
          sortRowsConfig={sortRowsConfig}
        />
      )}
      {children}
    </>
  );
}
