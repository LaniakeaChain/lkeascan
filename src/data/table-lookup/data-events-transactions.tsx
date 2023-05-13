import React from 'react';

import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import {
  EEventsHeaderType,
  EEventsSortAndFilterType,
  IEventsData,
} from 'models/models-table-events';
import { EHeaderIconType } from 'models/models-table-general';

import { parametersToInfo } from './data-resolve-parameters';
import { renderEventsData } from './helpers';

export const EVENTS_TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EEventsHeaderType.Name,
    fixedWidth: 272,
    headerIconType: EHeaderIconType.TextFilter,
    type: EEventsSortAndFilterType.eventName,
  },
  {
    headerType: EEventsHeaderType.Parameters,
    headerIconType: null,
  },
];

export const EVENTS_TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<(
  data: IEventsData,
) => JSX.Element> = {
  [EEventsHeaderType.Name]: renderEventsData,
  [EEventsHeaderType.Parameters]: (data: IEventsData) => (
    <ParametersPairList info={parametersToInfo(data.parameters, false, false, false)} />
  ),
};
