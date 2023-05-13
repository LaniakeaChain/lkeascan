import React from 'react';

import { TableContent } from 'components/table-content';
import { INftCollectionResultFetch } from 'models/models-account-nft-collections';
import {
  EDirectionType,
  EDisplayTitleType,
  IFetchConfig,
  IHeaderItem,
} from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { ISortValues } from 'models/models-table-general';
import { ETokensSortAndFilterType } from 'models/models-table-tokens';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETokensSortAndFilterType.lastExecuted,
};

interface Props {
  fetchConfig: IFetchConfig;
  headerItems: IHeaderItem[];
  noElementsMessage?: string;
  displayTitleType?: EDisplayTitleType;
}

export function NftCollectionTable({ displayTitleType, fetchConfig, headerItems }: Props) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<INftCollectionResultFetch>(fetchConfig);

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

  const { data, error, filterParams, loading } = state;

  return (
    <TableContent
      breadcrumbs={[
        {
          name: 'NFT Collections',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      noElementsMessage="There are no NFT collections to show."
      type={isDesktop ? EPageType.accountNftCollections : EPageType.accountNftCollectionsMobile}
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
        rowsDisplayedConfig: {
          size: filterParams.size,
          onRowsDisplayedChange: handleRowsDisplayedChange,
        },
      }}
      title="NFT Items"
    />
  );
}
