import React from 'react';

import { TableContent } from 'components/table-content';
import { BLOCKS_HEADER_ITEMS } from 'data/table-lookup/data-blocks';
import { EDirectionType, IFetchConfig } from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { EBlocksSortAndFilterType, IBlocksTableFetch } from 'models/models-table-blocks';
import { ISortValues } from 'models/models-table-general';
import { transformMultiFilterToString } from 'utils/api/queries-format';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: EBlocksSortAndFilterType.number,
};

interface Props {
  fetchConfig: IFetchConfig;
}

export function BlocksTable({ fetchConfig }: Props) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<IBlocksTableFetch>(fetchConfig);

  const handlePageNumberChange = (page: number) => {
    handleChangeFilterParams({ page });
  };

  const handleSortChange = (sortValues?: ISortValues) => {
    if (defined(sortValues)) {
      handleChangeFilterParams(sortValues);
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
          name: 'Blocks',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      noElementsMessage="There are no blocks to show."
      type={isDesktop ? EPageType.blocks : EPageType.blocksMobile}
      headerItems={BLOCKS_HEADER_ITEMS}
      data={data}
      error={error}
      loading={loading}
      tableFetchConfig={{
        filterConfig: {
          currentFilters,
          onFilterChange: handleFilterChange,
        },
        pageNumberConfig: {
          page: filterParams.page,
          onPageNumberChange: handlePageNumberChange,
        },
        sortRowsConfig: {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: handleSortChange,
        },
        rowsDisplayedConfig: {
          size: filterParams.size,
          onRowsDisplayedChange: handleRowsDisplayedChange,
        },
      }}
      title="Blocks"
    />
  );
}
