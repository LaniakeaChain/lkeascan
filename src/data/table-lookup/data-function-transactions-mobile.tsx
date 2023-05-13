import React from 'react';

import { ParametersPairList } from 'components/table-content/parameters-pair-list';
import { TextTruncate } from 'components/text-truncate';
import { IHeaderDictionary } from 'models/models-data-general';
import { EFunctionHeaderType, IFunctionData } from 'models/models-table-function';
import { formatHash } from 'utils/format';
import { isHash } from 'utils/variable-evaluation';

import { parametersToInfo } from './data-resolve-parameters';

export const FUNCTION_TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IFunctionData,
) => JSX.Element> = {
  [EFunctionHeaderType.Name]: (data: IFunctionData) => {
    if (isHash(data.functionName)) {
      return <span>{formatHash(data.functionName)}</span>;
    } else {
      return <TextTruncate>{data.functionName}</TextTruncate>;
    }
  },
  [EFunctionHeaderType.Parameters]: (data: IFunctionData) => (
    <ParametersPairList info={parametersToInfo(data.parameters, true)} />
  ),
};
