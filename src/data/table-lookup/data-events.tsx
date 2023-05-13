import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import {
  EEventsHeaderType,
  EEventsSortAndFilterType,
  IEventsData,
} from 'models/models-table-events';
import { EHeaderIconType } from 'models/models-table-general';
import { formatHash } from 'utils/format';

import { parametersToInfo } from './data-resolve-parameters';
import { renderEventsData } from './helpers';

export const EVENTS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EEventsHeaderType.Address,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.TransactionHash,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Name,
    headerIconType: EHeaderIconType.TextFilter,
    type: EEventsSortAndFilterType.eventName,
  },
  {
    headerType: EEventsHeaderType.Parameters,
    headerIconType: null,
  },
  {
    headerType: EEventsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: EEventsSortAndFilterType.timestampISO,
  },
];

export const EVENTS_CELL_LOOKUP: IHeaderDictionary<(data: IEventsData) => JSX.Element> = {
  [EEventsHeaderType.Address]: (data: IEventsData) => (
    <CellHash
      contentToCopy={data.to}
      linkConfig={{
        href: `/contracts/[detailsHash]`,
        as: `/contracts/${data.to}`,
      }}
    >
      {formatHash(data.to)}
    </CellHash>
  ),
  [EEventsHeaderType.TransactionHash]: (data: IEventsData) => (
    <CellHash
      contentToCopy={data.transactionHash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.transactionHash}`,
      }}
    >
      {formatHash(data.transactionHash)}
    </CellHash>
  ),
  [EEventsHeaderType.Name]: renderEventsData,
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters)} />
  ),
  [EEventsHeaderType.Time]: (data: IEventsData) => <CellTime>{data.timestampISO}</CellTime>,
};
