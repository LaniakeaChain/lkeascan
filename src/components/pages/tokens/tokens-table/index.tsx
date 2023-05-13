import React from 'react';

import { TableContent } from 'components/table-content';
import { TOKENS_HEADER_ITEMS } from 'data/table-lookup/data-tokens';
import { EDirectionType, IFetchConfig } from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { ISortValues } from 'models/models-table-general';
import { ETokensSortAndFilterType, ITokensTableFetch } from 'models/models-table-tokens';
import { transformMultiFilterToString } from 'utils/api/queries-format';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETokensSortAndFilterType.lastExecuted,
};

interface Props {
  fetchConfig: IFetchConfig;
}

export function TokensTable({ fetchConfig }: Props) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<ITokensTableFetch>(fetchConfig);

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
      breadcrumbs={[
        {
          name: 'Tokens',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      noElementsMessage="There are no tokens to show."
      type={isDesktop ? EPageType.tokens : EPageType.tokensMobile}
      headerItems={TOKENS_HEADER_ITEMS}
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
      title="Tokens"
    />
  );
}
