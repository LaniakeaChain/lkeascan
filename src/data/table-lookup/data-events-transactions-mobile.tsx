import React from 'react';

import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { TextTruncate } from 'components/text-truncate';
import { IHeaderDictionary } from 'models/models-data-general';
import { EEventsHeaderType, IEventsData } from 'models/models-table-events';
import { formatHash } from 'utils/format';
import { isHash } from 'utils/variable-evaluation';

import { parametersToInfo } from './data-resolve-parameters';

export const EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IEventsData,
) => JSX.Element> = {
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
};
