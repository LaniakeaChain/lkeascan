import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { ToolTipCellCopy } from 'components/table-content/desktop/table/table-data-row/cell-tool-tip-copy';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import {
  INftCollectionData,
  TAccountNftCollectionsHeaderType,
} from 'models/models-account-nft-collections';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { ETokensContractType } from 'models/models-table-tokens';
import { formatHash, formatWithCommas } from 'utils/format';
import { defined } from 'utils/variable-evaluation';

export const ACCOUNT_NFT_COLLECTION_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: TAccountNftCollectionsHeaderType.TokenAddress,
    headerIconType: null,
  },
  {
    headerType: TAccountNftCollectionsHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: TAccountNftCollectionsHeaderType.TokenId,
    headerIconType: null,
  },
  {
    headerType: TAccountNftCollectionsHeaderType.Amount,
    headerIconType: null,
  },
  {
    headerType: TAccountNftCollectionsHeaderType.TokenType,
    headerIconType: null,
  },
];

export const ACCOUNT_NFT_COLLECTION_CELL_LOOKUP: IHeaderDictionary<(
  data: INftCollectionData,
) => JSX.Element> = {
  [TAccountNftCollectionsHeaderType.TokenAddress]: (data: INftCollectionData) => (
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
  [TAccountNftCollectionsHeaderType.Name]: (data: INftCollectionData) =>
    defined(data.collection.name) ? (
      <TextOnly>{`${data.collection.name} (${data.collection.symbol})`}</TextOnly>
    ) : (
      <TextOnly>{'-'}</TextOnly>
    ),
  [TAccountNftCollectionsHeaderType.TokenId]: (data: INftCollectionData) => (
    <ToolTipCellCopy contentToCopy={data.tokenId}>
      <div className="cell --tooltip">
        <TextOnly>{data.tokenId}</TextOnly>
      </div>
    </ToolTipCellCopy>
  ),
  [TAccountNftCollectionsHeaderType.Amount]: (data: INftCollectionData) => (
    <TextOnly>{formatWithCommas(data.amount, 0, 0)}</TextOnly>
  ),
  [TAccountNftCollectionsHeaderType.TokenType]: (data: INftCollectionData) => (
    <TextOnly>{ETokensContractType[data.collection.contractType]}</TextOnly>
  ),
};
