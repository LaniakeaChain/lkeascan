import React from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EFunctionHeaderType, IFunctionData } from 'models/models-table-function';

import { parametersToInfo } from './data-resolve-parameters';

export const FUNCTION_TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EFunctionHeaderType.Name,
    headerIconType: null,
    fixedWidth: 272,
  },
  {
    headerType: EFunctionHeaderType.Parameters,
    headerIconType: null,
  },
];

export const FUNCTION_TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<(
  data: IFunctionData,
) => JSX.Element> = {
  [EFunctionHeaderType.Name]: (data: IFunctionData) => (
    <TextOnly style={{ color: '#434343' }}>{data.functionName}</TextOnly>
  ),
  [EFunctionHeaderType.Parameters]: (data: IFunctionData) => (
    <ParametersPairList info={parametersToInfo(data.parameters, false, false, false)} />
  ),
};
