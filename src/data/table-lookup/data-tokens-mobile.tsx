import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { TextTruncate } from 'components/text-truncate';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary } from 'models/models-data-general';
import { ETokensHeaderType, ITokensData } from 'models/models-table-tokens';
import { ETagType } from 'models/models-tags';
import { formatHash, formatWithCommas } from 'utils/format';
import { resolveTokenName, tokenTableTagLookup } from 'utils/tokens';
import { defined } from 'utils/variable-evaluation';

export const TOKENS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: ITokensData) => JSX.Element> = {
  [ETokensHeaderType.Type]: (data: ITokensData) => (
    <TypeTag tagType={ETagType[tokenTableTagLookup(data.contractType)]} />
  ),
  [ETokensHeaderType.Symbol]: (data: ITokensData) => <TextTruncate>{data.symbol}</TextTruncate>,
  [ETokensHeaderType.Name]: (data: ITokensData) => (
    <InlineHash
      contentToCopy={data.address}
      linkConfig={{
        href: `/tokens/[detailsHash]`,
        as: `/tokens/${data.address}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {resolveTokenName({ ...data, address: formatHash(data.address) })}
    </InlineHash>
  ),
  [ETokensHeaderType.Symbol]: (data: ITokensData) => <TextTruncate>{data.symbol}</TextTruncate>,
  [ETokensHeaderType.TotalSupply]: (data: ITokensData) => {
    if (data.totalSupply === 0) {
      return <TextTruncate>0</TextTruncate>;
    } else if (defined(data.totalSupply)) {
      return <TextTruncate>{formatWithCommas(data.totalSupply)}</TextTruncate>;
    } else {
      return <TextTruncate>Unknown</TextTruncate>;
    }
  },
  [ETokensHeaderType.TransactionCount]: (data: ITokensData) => (
    <TextTruncate>{formatWithCommas(data.transactionCount)}</TextTruncate>
  ),
  [ETokensHeaderType.LastExecution]: (data: ITokensData) => (
    <InlineTime>{data.lastExecutedTimestampISO}</InlineTime>
  ),
};
