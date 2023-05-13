import React from 'react';

import { TableContent } from 'components/table-content';
import {
  EDirectionType,
  EDisplayTitleType,
  IFetchConfig,
  IHeaderItem,
} from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { EContractsSortAndFilterType, IContractsTableFetch } from 'models/models-table-contracts';
import { ISortValues } from 'models/models-table-general';
import { transformMultiFilterToString } from 'utils/api/queries-format';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

interface Props {
  fetchConfig: IFetchConfig;
  headerItems: IHeaderItem[];
  noElementsMessage?: string;
  displayTitleType?: EDisplayTitleType;
}

export function ContractsTable({
  displayTitleType,
  fetchConfig,
  headerItems,
  noElementsMessage,
}: Props) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<IContractsTableFetch>(fetchConfig);

  const handlePageNumberChange = (page: number) => {
    handleChangeFilterParams({ page });
  };

  const handleSortChange = (sortConfig?: ISortValues) => {
    if (defined(sortConfig)) {
      handleChangeFilterParams(sortConfig);
    } else {
      handleChangeFilterParams({
        direction: EDirectionType.DESC,
        sort: EContractsSortAndFilterType.transactionCount,
      });
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
      breadcrumbs={[
        {
          name: 'Contracts',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      noElementsMessage={noElementsMessage || 'There are no contracts to show.'}
      type={isDesktop ? EPageType.contracts : EPageType.contractsMobile}
      displayTitleType={displayTitleType}
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
      title="Contracts"
    />
  );
}
