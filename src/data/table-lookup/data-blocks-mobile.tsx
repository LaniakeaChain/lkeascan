import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { TextTruncate } from 'components/text-truncate';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary } from 'models/models-data-general';
import { EBlocksHeaderType, IBlocksData } from 'models/models-table-blocks';
import { ETagType } from 'models/models-tags';
import { formatHash } from 'utils/format';

export const BLOCKS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: IBlocksData) => JSX.Element> = {
  [EBlocksHeaderType.Type]: () => <TypeTag tagType={ETagType['Block']} />,
  [EBlocksHeaderType.Hash]: (data: IBlocksData) => (
    <InlineHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/blocks/[detailsHash]`,
        as: `/blocks/${data.hash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [EBlocksHeaderType['Block Number']]: (data: IBlocksData) => (
    <InlineHash
      contentToCopy={data.number.toString()}
      linkConfig={{
        href: `/blocks/[detailsHash]`,
        as: `/blocks/${data.hash}`,
      }}
    >
      {data.number.toString()}
    </InlineHash>
  ),
  [EBlocksHeaderType['Transaction Count']]: (data: IBlocksData) => (
    <TextTruncate>{data.transactionCount.toString()}</TextTruncate>
  ),
  [EBlocksHeaderType.Time]: (data: IBlocksData) => <InlineTime>{data.timestampISO}</InlineTime>,
};
