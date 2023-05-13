import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { TextTruncate } from 'components/text-truncate';
import { IHeaderDictionary } from 'models/models-data-general';
import { EEventsHeaderType, IEventsData } from 'models/models-table-events';
import { formatHash } from 'utils/format';
import { isHash } from 'utils/variable-evaluation';

import { parametersToInfo } from './data-resolve-parameters';

export const EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IEventsData,
) => JSX.Element> = {
  [EEventsHeaderType.TransactionHash]: (data: IEventsData) => (
    <InlineHash
      contentToCopy={data.transactionHash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.transactionHash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.transactionHash)}
    </InlineHash>
  ),
  [EEventsHeaderType.Name]: (data: IEventsData) => {
    if (isHash(data.eventName)) {
      return <span>{formatHash(data.eventName)}</span>;
    } else {
      return <TextTruncate>{data.eventName}</TextTruncate>;
    }
  },
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters, true)} />
  ),
  [EEventsHeaderType.Time]: (data: IEventsData) => <InlineTime>{data.timestampISO}</InlineTime>,
};
