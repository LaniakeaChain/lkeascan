import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EHeaderIconType } from 'models/models-table-general';
import {
  EHoldersHeaderType,
  EHoldersSortAndFilterType,
  IHoldersData,
} from 'models/models-table-holders';
import { formatHash, formatWithCommas } from 'utils/format';
import { getOptimalLink, toNextLink } from 'utils/links';
import { defined, isHash } from 'utils/variable-evaluation';

export const HOLDERS_HEADER_ERC20: IHeaderItem[] = [
  {
    headerType: EHoldersHeaderType.Holder,
    headerIconType: EHeaderIconType.TextFilter,
    type: EHoldersSortAndFilterType.holderAddress,
  },
  {
    headerType: EHoldersHeaderType.Balances,
    headerIconType: null,
  },
];

export const HOLDERS_HEADER_ERC223: IHeaderItem[] = [
  {
    headerType: EHoldersHeaderType.Holder,
    headerIconType: EHeaderIconType.TextFilter,
    type: EHoldersSortAndFilterType.holderAddress,
  },
  {
    headerType: EHoldersHeaderType.Balances,
    headerIconType: null,
  },
];

export const HOLDERS_HEADER_ERC777: IHeaderItem[] = [
  {
    headerType: EHoldersHeaderType.Holder,
    headerIconType: EHeaderIconType.TextFilter,
    type: EHoldersSortAndFilterType.holderAddress,
  },
  {
    headerType: EHoldersHeaderType.Balances,
    headerIconType: null,
  },
];

export const HOLDERS_HEADER_ERC721: IHeaderItem[] = [
  {
    headerType: EHoldersHeaderType.Holder,
    headerIconType: EHeaderIconType.TextFilter,
    type: EHoldersSortAndFilterType.holderAddress,
  },
  {
    headerType: EHoldersHeaderType.Balances721,
    headerIconType: null,
  },
];

export const HOLDERS_HEADER_ERC1155: IHeaderItem[] = [
  {
    headerType: EHoldersHeaderType.Holder,
    headerIconType: EHeaderIconType.TextFilter,
    type: EHoldersSortAndFilterType.holderAddress,
  },
  {
    headerType: EHoldersHeaderType.Balances1155,
    headerIconType: null,
  },
];

export const HOLDERS_CELL_LOOKUP: IHeaderDictionary<(data: IHoldersData) => JSX.Element> = {
  [EHoldersHeaderType.Holder]: (data: IHoldersData) => {
    const linkToDisplay = getOptimalLink(['account', 'token', 'contract'], data.holderAddressLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={data.holderAddressLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display}
      </CellHash>
    );
  },
  [EHoldersHeaderType.Balances]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ quantity, symbol }) => (
        <div key={`${holderAddress}`}>
          {quantity && (
            <TextOnly>{`${formatWithCommas(quantity)}  ${defined(symbol) ? symbol : ''}`}</TextOnly>
          )}
        </div>
      ))}
    </>
  ),
  [EHoldersHeaderType.Balances721]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ count, tokenAddress }) => (
        <div key={`${holderAddress}_${tokenAddress}`}>{count}</div>
      ))}
    </>
  ),
  [EHoldersHeaderType.Balances1155]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ count, tokenAddress }) => (
        <div key={`${holderAddress}_${tokenAddress}`}>{count}</div>
      ))}
    </>
  ),
};
