import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import {
  EContractsContractType,
  EContractsHeaderType,
  EContractsSortAndFilterType,
  IContractsData,
} from 'models/models-table-contracts';
import { EHeaderIconType } from 'models/models-table-general';
import { formatHash, formatIntegersWithComma } from 'utils/format';
import { getOptimalLink, toNextLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { resolveName } from './helpers';

export const CONTRACTS_METADATA_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EContractsHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: EContractsSortAndFilterType.contractType,
    options: Object.keys(EContractsContractType).map(
      (type: string) => EContractsContractType[type],
    ),
    fixedWidth: 100,
  },
  {
    headerType: EContractsHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: EContractsHeaderType['Transaction Count'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.transactionCount,
  },
  {
    headerType: EContractsHeaderType['Creation Date'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.created,
  },
  {
    headerType: EContractsHeaderType['Last Execution'],
    headerIconType: EHeaderIconType.Sort,
    type: EContractsSortAndFilterType.lastExecuted,
  },
];

export const CONTRACTS_HEADER_ITEMS: IHeaderItem[] =
  process.env.ENABLE_PAID_FEATURES === 'enabled'
    ? [
        ...CONTRACTS_METADATA_HEADER_ITEMS.slice(0, 1),
        {
          headerType: EContractsHeaderType.Name,
          headerIconType: null,
        },
        ...CONTRACTS_METADATA_HEADER_ITEMS.slice(1, CONTRACTS_METADATA_HEADER_ITEMS.length),
      ]
    : CONTRACTS_METADATA_HEADER_ITEMS;

export const MOST_ACTIVE_CONTRACTS = CONTRACTS_HEADER_ITEMS.slice(
  0,
  4,
).map(({ fixedWidth, headerType }: IHeaderItem) => ({ fixedWidth, headerType }));

export const CONTRACTS_CELL_LOOKUP: IHeaderDictionary<(data: IContractsData) => JSX.Element> = {
  [EContractsHeaderType.Type]: (data: IContractsData) => <TypeTag tagType={data.contractType} />,
  [EContractsHeaderType.Name]: (data: IContractsData) => resolveName(data),
  [EContractsHeaderType.Hash]: (data: IContractsData) => {
    const contractLink = getOptimalLink(['token', 'contract', 'account'], data.links);
    return (
      <CellHash
        contentToCopy={contractLink.display}
        linkConfig={contractLink.nextLinkConfig}
        allLinks={data.links.map(toNextLink)}
      >
        {isHash(contractLink.display) ? formatHash(contractLink.display) : contractLink.display}
      </CellHash>
    );
  },
  [EContractsHeaderType['Transaction Count']]: (data: IContractsData) => (
    <TextOnly>{formatIntegersWithComma(data.transactionCount)}</TextOnly>
  ),
  [EContractsHeaderType['Creation Date']]: (data: IContractsData) => (
    <CellTime>{data.createdTimestampISO}</CellTime>
  ),
  [EContractsHeaderType['Last Execution']]: (data: IContractsData) => (
    <CellTime>{data.lastExecutedTimestampISO}</CellTime>
  ),
};
