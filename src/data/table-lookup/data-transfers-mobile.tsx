import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { InlineValue } from 'components/table-content/mobile/table/table-mobile-item/inline-value';
import { IHeaderDictionary } from 'models/models-data-general';
import { ETransfersHeaderType, ITransfersData } from 'models/models-table-transfers';
import { formatHash } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

export const TRANSFERS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: ITransfersData,
) => JSX.Element> = {
  [ETransfersHeaderType.Hash]: (data: ITransfersData) => (
    <InlineHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transfers/[detailsHash]`,
        as: `/transfers/${data.hash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [ETransfersHeaderType.Quantity]: (data: ITransfersData) => (
    <InlineValue contentToCopy={data.quantity}>{data.quantity}</InlineValue>
  ),
  [ETransfersHeaderType.Amount]: (data: ITransfersData) => (
    <InlineValue contentToCopy={data.amount}>{data.amount}</InlineValue>
  ),
  [ETransfersHeaderType.TokenId]: (data: ITransfersData) => (
    <InlineValue contentToCopy={data.tokenId}>{data.tokenId}</InlineValue>
  ),
  [ETransfersHeaderType.From]: (data: ITransfersData) => {
    const fromLink = getOptimalLink(['token', 'contract', 'account'], data.fromLinks);
    return (
      <InlineHash
        contentToCopy={fromLink.display}
        linkConfig={{
          ...fromLink.nextLinkConfig,
          style: {
            fontSize: 14,
            lineHeight: '20px',
          },
        }}
      >
        {isHash(fromLink.display) ? formatHash(fromLink.display) : fromLink.display.replace(/^0x/, 'LK')}
      </InlineHash>
    );
  },
  [ETransfersHeaderType.To]: (data: ITransfersData) => {
    const toLink = getOptimalLink(['token', 'contract', 'account'], data.toLinks);
    return (
      <InlineHash
        style={{
          fontSize: 14,
          lineHeight: '20px',
        }}
        contentToCopy={toLink.display}
        linkConfig={{ ...toLink.nextLinkConfig }}
      >
        {isHash(toLink.display) ? formatHash(toLink.display) : toLink.display.replace(/^0x/, 'LK')}
      </InlineHash>
    );
  },
  [ETransfersHeaderType.Time]: (data: ITransfersData) => (
    <InlineTime>{data.timestampISO}</InlineTime>
  ),
};
