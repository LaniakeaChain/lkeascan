import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { TextTruncate } from 'components/text-truncate';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary } from 'models/models-data-general';
import { ILinkItem } from 'models/models-general';
import { EContractsHeaderType, IContractsData } from 'models/models-table-contracts';
import { formatHash, formatIntegersWithComma } from 'utils/format';
import { toNextLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { resolveName } from './helpers';

export const CONTRACTS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IContractsData,
) => JSX.Element> = {
  [EContractsHeaderType.Type]: (data: IContractsData) => <TypeTag tagType={data.contractType} />,
  [EContractsHeaderType.Name]: (data: IContractsData) => resolveName(data, true),
  [EContractsHeaderType.Hash]: (data: IContractsData) => {
    const contractLink: ILinkItem = toNextLink(data.links.find((i) => i.rel === 'contract'));
    return (
      <InlineHash
        contentToCopy={contractLink.display}
        linkConfig={{
          ...contractLink.nextLinkConfig,
          style: {
            fontSize: 16,
            lineHeight: '20px',
          },
        }}
      >
        {isHash(contractLink.display) ? formatHash(contractLink.display) : contractLink.display}
      </InlineHash>
    );
  },
  [EContractsHeaderType['Transaction Count']]: (data: IContractsData) => (
    <TextTruncate>{formatIntegersWithComma(data.transactionCount)}</TextTruncate>
  ),
  [EContractsHeaderType['Creation Date']]: (data: IContractsData) => (
    <InlineTime>{data.createdTimestampISO}</InlineTime>
  ),
  [EContractsHeaderType['Last Execution']]: (data: IContractsData) => (
    <InlineTime>{data.lastExecutedTimestampISO}</InlineTime>
  ),
};
