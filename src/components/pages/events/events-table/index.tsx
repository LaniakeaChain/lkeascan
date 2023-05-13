import React from 'react';

import { TableContent } from 'components/table-content';
import {
  EDirectionType,
  EDisplayTitleType,
  IFetchConfig,
  IHeaderItem,
} from 'models/models-data-general';
import { EPageType, IDictionary, INameValuePair } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { IEventsTableFetch } from 'models/models-table-events';
import { ISortValues } from 'models/models-table-general';
import { ETransactionsSortAndFilterType } from 'models/models-table-transactions';
import { transformMultiFilterToString } from 'utils/api/queries-format';
import useTableFetch from 'utils/api/use-table-fetch';
import { defined } from 'utils/variable-evaluation';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETransactionsSortAndFilterType.timestampISO,
};

interface Props {
  breadcrumbs?: INameValuePair[];
  tablePageType: EPageType;
  headerItems: IHeaderItem[];
  fetchConfig: IFetchConfig;
  displayTitleType?: EDisplayTitleType;
  noElementsMessage?: string;
}

export function EventsTable({
  breadcrumbs,
  displayTitleType,
  fetchConfig,
  headerItems,
  noElementsMessage,
  tablePageType,
}: Props) {
  const [state, handleChangeFilterParams] = useTableFetch<IEventsTableFetch>(fetchConfig);

  const handlePageNumberChange = (page: number) => {
    handleChangeFilterParams({ page });
  };

  const handleSortChange = (sortConfig?: ISortValues) => {
    if (defined(sortConfig)) {
      handleChangeFilterParams(sortConfig);
    } else {
      handleChangeFilterParams(DEFAULT_SORT_CONFIG);
    }
  };

  const handleRowsDisplayedChange = (selectedOption: IDropdownOption) => {
    const size = parseFloat(selectedOption.value);
    const page = Math.floor((state.filterParams.size / size) * state.filterParams.page);
    handleChangeFilterParams({ size, page });
  };

  const handleFilterChange = (filters: IDictionary<any>) => {
    handleChangeFilterParams({
      filter: transformMultiFilterToString({
        ...state.currentFilters,
        ...filters,
      }),
      page: 0,
    });
  };

  const { currentFilters, data, error, filterParams, loading } = state;

  return (
    <TableContent
      breadcrumbs={breadcrumbs}
      isFilterSet={!!filterParams.filter}
      noElementsMessage={noElementsMessage || 'There are no events to show.'}
      displayTitleType={displayTitleType}
      type={tablePageType}
      headerItems={headerItems}
      data={data}
      error={error}
      loading={loading}
      tableFetchConfig={{
        pageNumberConfig: {
          page: filterParams.page,
          onPageNumberChange: handlePageNumberChange,
        },
        sortRowsConfig: {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: handleSortChange,
        },
        filterConfig: {
          currentFilters,
          onFilterChange: handleFilterChange,
        },
        rowsDisplayedConfig: {
          size: filterParams.size,
          onRowsDisplayedChange: handleRowsDisplayedChange,
        },
      }}
      title="Events"
    />
  );
}
