import React from 'react';

import { FlexView } from 'components/composable/flex-view';
import { ICONS } from 'components/svg/icons';
import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { InlineValue } from 'components/table-content/mobile/table/table-mobile-item/inline-value';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary } from 'models/models-data-general';
import {
  EInternalTransactionsHeaderType,
  ETransactionsHeaderType,
  IInternalTransactionsData,
  ITransactionsData,
} from 'models/models-table-transactions';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import { formatHash, formatNativeToDecimals, formatWithCommas } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { renderFunctionInline } from './helpers';

export const INTERNAL_TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IInternalTransactionsData,
) => JSX.Element> = {
  [EInternalTransactionsHeaderType.Type]: (data: IInternalTransactionsData) => (
    <TypeTag tagType={ETagType[data.transactionType]} />
  ),
  [EInternalTransactionsHeaderType.Function]: renderFunctionInline,
  [EInternalTransactionsHeaderType.ParentHash]: (data: IInternalTransactionsData) => (
    <InlineHash
      contentToCopy={data.parentHash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.parentHash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.parentHash)}
    </InlineHash>
  ),
  [EInternalTransactionsHeaderType.From]: (data: IInternalTransactionsData) => {
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
        {isHash(fromLink.display) ? formatHash(fromLink.display) : fromLink.display}
      </InlineHash>
    );
  },
  [EInternalTransactionsHeaderType.To]: (data: IInternalTransactionsData) => {
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
        {isHash(toLink.display) ? formatHash(toLink.display) : toLink.display}
      </InlineHash>
    );
  },
  [EInternalTransactionsHeaderType.Value]: (data: IInternalTransactionsData) => (
    <InlineValue
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={`${formatWithCommas(parseFloat(data.value), 0, 0)} ${themed('smallCurrency')}`}
      unit={themed('currency')}
    >
      {formatNativeToDecimals(data.ethValue)}
    </InlineValue>
  ),
  [EInternalTransactionsHeaderType.Time]: (data: IInternalTransactionsData) => (
    <InlineTime>{data.timestampISO}</InlineTime>
  ),
};

export const TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: ITransactionsData,
) => JSX.Element> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <FlexView flexDirection="row" style={{ gap: '5px', alignItems: 'center' }}>
      {data.status !== '0x1' && ICONS.Error}
      <TypeTag isPrivate={data.isPrivate} tagType={ETagType[data.transactionType]} />
    </FlexView>
  ),
  [ETransactionsHeaderType.Function]: renderFunctionInline,
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <InlineHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.hash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => {
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
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => {
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
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <InlineValue
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={`${formatWithCommas(parseFloat(data.value), 0, 0)} ${themed('smallCurrency')}`}
      unit={themed('currency')}
    >
      {formatNativeToDecimals(data.ethValue)}
    </InlineValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <InlineTime>{data.timestampISO}</InlineTime>
  ),
};
