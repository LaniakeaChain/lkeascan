import React from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { ITokenBalances, TAccountBalancesHeaderType } from 'models/models-account-token-balances';
import { IHeaderDictionary } from 'models/models-data-general';
import { ETokensContractType } from 'models/models-table-tokens';
import { formatHash, formatWithCommas } from 'utils/format';

export const ACCOUNT_TOKENS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: ITokenBalances,
) => JSX.Element> = {
  [TAccountBalancesHeaderType.TokenAddress]: (data: ITokenBalances) => (
    <InlineHash
      contentToCopy={data.tokenAddress}
      linkConfig={{
        href: `/tokens/[detailsHash]`,
        as: `/tokens/${data.tokenAddress}`,
      }}
    >
      {formatHash(data.tokenAddress)}
    </InlineHash>
  ),
  [TAccountBalancesHeaderType.Amount]: (data: ITokenBalances) => (
    <TextOnly>{formatWithCommas(data.quantity, 0, 0)}</TextOnly>
  ),
  [TAccountBalancesHeaderType.Symbol]: (data: ITokenBalances) => <TextOnly>{data.symbol}</TextOnly>,
  [TAccountBalancesHeaderType.TokenType]: (data: ITokenBalances) => (
    <TextOnly>{ETokensContractType[data.tokenType]}</TextOnly>
  ),
};
