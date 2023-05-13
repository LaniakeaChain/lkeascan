import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { TextTruncate } from 'components/text-truncate';
import { IHeaderDictionary } from 'models/models-data-general';
import { EHoldersHeaderType, IHoldersData } from 'models/models-table-holders';
import { formatHash, formatWithCommas } from 'utils/format';
import { defined } from 'utils/variable-evaluation';

export const HOLDERS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: IHoldersData) => JSX.Element> = {
  [EHoldersHeaderType.Holder]: (data: IHoldersData) => (
    <InlineHash
      contentToCopy={data.holderAddress}
      linkConfig={{
        href: `/accounts/[detailsHash]`,
        as: `/accounts/${data.holderAddress}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.holderAddress)}
    </InlineHash>
  ),
  [EHoldersHeaderType.Balances]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ quantity, symbol }) => (
        <div key={`${holderAddress}`}>
          <TextTruncate>{`${formatWithCommas(quantity)} ${
            defined(symbol) ? symbol : ''
          }`}</TextTruncate>
        </div>
      ))}
    </>
  ),
  [EHoldersHeaderType.Balances721]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ count }) => (
        <div key={`${holderAddress}`}>
          <TextTruncate>{count}</TextTruncate>
        </div>
      ))}
    </>
  ),
  [EHoldersHeaderType.Balances1155]: ({ balances, holderAddress }: IHoldersData) => (
    <>
      {balances.map(({ count }) => (
        <div key={`${holderAddress}`}>
          <TextTruncate>{count}</TextTruncate>
        </div>
      ))}
    </>
  ),
};
