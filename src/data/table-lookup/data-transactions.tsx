import React from 'react';

import { FlexView } from 'components/composable/flex-view';
import { ICONS } from 'components/svg/icons';
import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { CellValue } from 'components/table-content/desktop/table/table-data-row/cell-value';
import { ToolTip } from 'components/tool-tip';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EHeaderIconType } from 'models/models-table-general';
import {
  EInternalTransactionsHeaderType,
  ETransactionsHeaderType,
  ETransactionsSortAndFilterType,
  ETransactionsTransactionType,
  IInternalTransactionsData,
  ITransactionsData,
} from 'models/models-table-transactions';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import { formatHash, formatNativeToDecimals } from 'utils/format';
import { getOptimalLink, toNextLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { renderFunctionCell } from './helpers';

const currency = themed('currency');

export const TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETransactionsHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETransactionsSortAndFilterType.transactionType,
    options: Object.keys(ETransactionsTransactionType).map(
      (type: string) => ETransactionsTransactionType[type],
    ),
    fixedWidth: 173,
  },
  {
    headerType: ETransactionsHeaderType.Function,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.From,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.To,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Value,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.ethValue,
  },
  {
    headerType: ETransactionsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.timestampISO,
  },
];

export const TRANSACTIONS_ACCOUNT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS;
export const TRANSACTIONS_CONTRACT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS;

const INTERNAL_TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EInternalTransactionsHeaderType.Type,
    headerIconType: null,
  },
  {
    headerType: EInternalTransactionsHeaderType.Function,
    headerIconType: null,
  },
  {
    headerType: EInternalTransactionsHeaderType.ParentHash,
    headerIconType: null,
  },
  {
    headerType: EInternalTransactionsHeaderType.From,
    headerIconType: null,
  },
  {
    headerType: EInternalTransactionsHeaderType.To,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Value,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.ethValue,
  },
  {
    headerType: ETransactionsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.timestampISO,
  },
];

export const INTERNAL_TRANSACTIONS_CONTRACT_HEADER_ITEMS: IHeaderItem[] = INTERNAL_TRANSACTIONS_HEADER_ITEMS;

const TRANSACTIONS_NESTED_HEADER_ITEMS: IHeaderItem[] = [
  ...TRANSACTIONS_HEADER_ITEMS.slice(0, TRANSACTIONS_HEADER_ITEMS.length - 1),
];

export const TRANSACTIONS_BLOCK_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_NESTED_HEADER_ITEMS;

export const INTERNAL_TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<(
  data: IInternalTransactionsData,
) => JSX.Element> = {
  [EInternalTransactionsHeaderType.Type]: ({ transactionType }: IInternalTransactionsData) => (
    <TypeTag tagType={ETagType[transactionType]} />
  ),
  [EInternalTransactionsHeaderType.Function]: renderFunctionCell,
  [EInternalTransactionsHeaderType.ParentHash]: ({ parentHash }: IInternalTransactionsData) => (
    <span>
      <CellHash
        contentToCopy={parentHash}
        linkConfig={{
          href: `/transactions/[detailsHash]`,
          as: `/transactions/${parentHash}`,
        }}
      >
        {formatHash(parentHash)}
      </CellHash>
    </span>
  ),
  [EInternalTransactionsHeaderType.From]: ({ fromLinks }: IInternalTransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], fromLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={fromLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display}
      </CellHash>
    );
  },
  [EInternalTransactionsHeaderType.To]: ({ toLinks }: IInternalTransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], toLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={toLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display}
      </CellHash>
    );
  },
  [EInternalTransactionsHeaderType.Value]: (data: IInternalTransactionsData) => (
    <CellValue
      contentToCopy={`${formatNativeToDecimals(data.ethValue)} ${currency}`}
      unit={currency}
    >
      {formatNativeToDecimals(data.ethValue)}
    </CellValue>
  ),
  [EInternalTransactionsHeaderType.Time]: (data: IInternalTransactionsData) => (
    <CellTime>{data.timestampISO}</CellTime>
  ),
};

export const TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<(
  data: ITransactionsData,
) => JSX.Element> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <FlexView flexDirection="row" style={{ gap: '5px', alignItems: 'center' }}>
      {data.status !== '0x1' && (
        <ToolTipInline
          toolTipContent={<ToolTip>{data.revertReason || 'Transaction Reverted'}</ToolTip>}
        >
          {ICONS.Error}
        </ToolTipInline>
      )}
      <TypeTag isPrivate={data.isPrivate} tagType={ETagType[data.transactionType]} />
    </FlexView>
  ),
  [ETransactionsHeaderType.Function]: renderFunctionCell,
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <CellHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.hash}`,
      }}
    >
      {formatHash(data.hash)}
    </CellHash>
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], data.fromLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={data.fromLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display.replace(/^0x/, 'LK')}
      </CellHash>
    );
  },
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], data.toLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={data.toLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display.replace(/^0x/, 'LK')}
      </CellHash>
    );
  },
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <CellValue
      contentToCopy={`${formatNativeToDecimals(data.ethValue)} ${currency}`}
      unit={currency}
    >
      {formatNativeToDecimals(data.ethValue)}
    </CellValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <CellTime>{data.timestampISO}</CellTime>
  ),
};
