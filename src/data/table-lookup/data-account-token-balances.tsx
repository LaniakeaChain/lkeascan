import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { ITokenBalances, TAccountBalancesHeaderType } from 'models/models-account-token-balances';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { ETokensContractType } from 'models/models-table-tokens';
import { formatHash, formatWithCommas } from 'utils/format';

export const ACCOUNT_TOKENS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: TAccountBalancesHeaderType.TokenAddress,
    headerIconType: null,
  },
  {
    headerType: TAccountBalancesHeaderType.Amount,
    headerIconType: null,
  },
  {
    headerType: TAccountBalancesHeaderType.Symbol,
    headerIconType: null,
  },
  {
    headerType: TAccountBalancesHeaderType.TokenType,
    headerIconType: null,
  },
];

export const ACCOUNT_TOKENS_CELL_LOOKUP: IHeaderDictionary<(
  data: ITokenBalances,
) => JSX.Element> = {
  [TAccountBalancesHeaderType.TokenAddress]: (data: ITokenBalances) => (
    <CellHash
      contentToCopy={data.tokenAddress}
      linkConfig={{
        href: `/tokens/[detailsHash]`,
        as: `/tokens/${data.tokenAddress}`,
      }}
    >
      {formatHash(data.tokenAddress)}
    </CellHash>
  ),
  [TAccountBalancesHeaderType.Amount]: (data: ITokenBalances) => (
    <TextOnly>{formatWithCommas(data.quantity, 0, 0)}</TextOnly>
  ),
  [TAccountBalancesHeaderType.Symbol]: (data: ITokenBalances) => <TextOnly>{data.symbol}</TextOnly>,
  [TAccountBalancesHeaderType.TokenType]: (data: ITokenBalances) => (
    <TextOnly>{ETokensContractType[data.tokenType]}</TextOnly>
  ),
};
