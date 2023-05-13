import React from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineValue } from 'components/table-content/mobile/table/table-mobile-item/inline-value';
import {
  INftCollectionData,
  TAccountNftCollectionsHeaderType,
} from 'models/models-account-nft-collections';
import { IHeaderDictionary } from 'models/models-data-general';
import { ETokensContractType } from 'models/models-table-tokens';
import { formatHash, formatWithCommas } from 'utils/format';
import { defined } from 'utils/variable-evaluation';

export const ACCOUNT_NFT_MOBILE_COLLECTION_CELL_LOOKUP: IHeaderDictionary<(
  data: INftCollectionData,
) => JSX.Element> = {
  [TAccountNftCollectionsHeaderType.TokenAddress]: (data: INftCollectionData) => (
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
  [TAccountNftCollectionsHeaderType.Name]: (data: INftCollectionData) =>
    defined(data.collection.name) ? (
      <TextOnly>{`${data.collection.name} (${data.collection.symbol})`}</TextOnly>
    ) : (
      <TextOnly>{'-'}</TextOnly>
    ),
  [TAccountNftCollectionsHeaderType.TokenId]: (data: INftCollectionData) => (
    <InlineValue contentToCopy={data.tokenId}>{data.tokenId}</InlineValue>
  ),
  [TAccountNftCollectionsHeaderType.Amount]: (data: INftCollectionData) => (
    <TextOnly>{formatWithCommas(data.amount, 0, 0)}</TextOnly>
  ),
  [TAccountNftCollectionsHeaderType.TokenType]: (data: INftCollectionData) => (
    <TextOnly>{ETokensContractType[data.collection.contractType]}</TextOnly>
  ),
};
