import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import {
  EBlocksHeaderType,
  EBlocksSortAndFilterType,
  IBlocksData,
} from 'models/models-table-blocks';
import { EHeaderIconType } from 'models/models-table-general';
import { ETagType } from 'models/models-tags';
import { formatHash } from 'utils/format';

export const BLOCKS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EBlocksHeaderType.Type,
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType['Block Number'],
    headerIconType: null,
  },
  {
    headerType: EBlocksHeaderType['Transaction Count'],
    headerIconType: EHeaderIconType.Sort,
    type: EBlocksSortAndFilterType.transactionCount,
  },
  {
    headerType: EBlocksHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: EBlocksSortAndFilterType.timestampISO,
  },
];

export const BLOCKS_CELL_LOOKUP: IHeaderDictionary<(data: IBlocksData) => JSX.Element> = {
  [EBlocksHeaderType.Type]: () => <TypeTag tagType={ETagType['Block']} />,
  [EBlocksHeaderType.Hash]: (data: IBlocksData) => (
    <CellHash
      contentToCopy={data.hash}
      linkConfig={{ href: `/blocks/[detailsHash]`, as: `/blocks/${data.hash}` }}
    >
      {formatHash(data.hash)}
    </CellHash>
  ),
  [EBlocksHeaderType['Block Number']]: (data: IBlocksData) => (
    <CellHash
      contentToCopy={data.number.toString()}
      linkConfig={{
        href: `/blocks/[detailsHash]`,
        as: `/blocks/${data.hash}`,
      }}
    >
      {data.number.toString()}
    </CellHash>
  ),
  [EBlocksHeaderType['Transaction Count']]: (data: IBlocksData) => (
    <TextOnly>{data.transactionCount.toString()}</TextOnly>
  ),
  [EBlocksHeaderType.Time]: (data: IBlocksData) => <CellTime>{data.timestampISO}</CellTime>,
};
