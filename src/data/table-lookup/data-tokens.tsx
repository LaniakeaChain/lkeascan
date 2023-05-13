import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EHeaderIconType } from 'models/models-table-general';
import {
  ETokensContractType,
  ETokensHeaderType,
  ETokensSortAndFilterType,
  ITokensData,
} from 'models/models-table-tokens';
import { ETagType } from 'models/models-tags';
import { formatHash, formatWithCommas } from 'utils/format';
import { resolveTokenName, tokenTableTagLookup } from 'utils/tokens';
import { defined } from 'utils/variable-evaluation';

export const TOKENS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETokensHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETokensSortAndFilterType.contractType,
    options: Object.keys(ETokensContractType).map((type: string) => ETokensContractType[type]),
    optionsLabelLookup: {
      ERC20: 'Fungible',
      ERC721: 'Non-Fungible',
      ERC1155: 'ERC1155',
      ERC223: 'ERC223',
    },
  },
  {
    headerType: ETokensHeaderType.Name,
    headerIconType: null,
  },
  {
    headerType: ETokensHeaderType.TotalSupply,
    headerIconType: null,
  },
  {
    headerType: ETokensHeaderType.Symbol,
    headerIconType: null,
  },
  {
    headerType: ETokensHeaderType.TransactionCount,
    headerIconType: EHeaderIconType.Sort,
    type: ETokensSortAndFilterType.transactionCount,
  },
  {
    headerType: ETokensHeaderType.LastExecution,
    headerIconType: EHeaderIconType.Sort,
    type: ETokensSortAndFilterType.lastExecuted,
  },
];

export const TOKENS_CELL_LOOKUP: IHeaderDictionary<(data: ITokensData) => JSX.Element> = {
  [ETokensHeaderType.Type]: (data: ITokensData) => (
    <TypeTag tagType={ETagType[tokenTableTagLookup(data.contractType)]} />
  ),
  [ETokensHeaderType.Name]: (data: ITokensData) => (
    <CellHash
      contentToCopy={data.address}
      linkConfig={{
        href: `/tokens/[detailsHash]`,
        as: `/tokens/${data.address}`,
      }}
    >
      {resolveTokenName({ ...data, address: formatHash(data.address) })}
    </CellHash>
  ),
  [ETokensHeaderType.Symbol]: (data: ITokensData) => <TextOnly>{data.symbol}</TextOnly>,
  [ETokensHeaderType.TotalSupply]: (data: ITokensData) => {
    if (data.totalSupply === 0) {
      return <TextOnly>0</TextOnly>;
    } else if (defined(data.totalSupply)) {
      return <TextOnly>{` ${formatWithCommas(data.totalSupply)}`}</TextOnly>;
    } else {
      return <TextOnly>-</TextOnly>;
    }
  },
  [ETokensHeaderType.TransactionCount]: (data: ITokensData) => (
    <TextOnly>{formatWithCommas(data.transactionCount)}</TextOnly>
  ),
  [ETokensHeaderType.LastExecution]: (data: ITokensData) => (
    <CellTime>{data.lastExecutedTimestampISO}</CellTime>
  ),
};
