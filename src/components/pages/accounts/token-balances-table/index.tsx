import React from 'react';

import { TableContent } from 'components/table-content';
import {
  CustomTokenBalanceData,
  ITokenBalancesTableFetch,
} from 'models/models-account-token-balances';
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

export function TokenBalancesTable({ displayTitleType, fetchConfig, headerItems }: Props) {
  const isDesktop = useIsDesktop();

  const [state, handleChangeFilterParams] = useTableFetch<ITokenBalancesTableFetch>(fetchConfig);

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

  const balancesData: CustomTokenBalanceData = defined(data)
    ? {
        paging: data?.paging,
        data: data.data.length > 0 ? data?.data[0]?.balances : [],
        metadata: data?.metadata,
      }
    : undefined;

  return (
    <TableContent
      breadcrumbs={[
        {
          name: 'Token Balances',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      noElementsMessage="There are no token balances to show."
      type={isDesktop ? EPageType.accountTokens : EPageType.accountTokensMobile}
      displayTitleType={displayTitleType}
      headerItems={headerItems}
      data={balancesData}
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
      title="Token Balances"
    />
  );
}
