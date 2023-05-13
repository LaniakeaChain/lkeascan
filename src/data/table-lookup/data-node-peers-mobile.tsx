import React from 'react';

import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { IHeaderDictionary } from 'models/models-data-general';
import { ENodePeersHeaderType, IPeerData } from 'models/models-table-peers';
import { formatHash } from 'utils/format';

export const NODE_PEERS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(data: IPeerData) => JSX.Element> = {
  [ENodePeersHeaderType.ID]: (data: IPeerData) => (
    <InlineHash contentToCopy={data.id}>{formatHash(data.id)}</InlineHash>
  ),
  [ENodePeersHeaderType.Name]: (data: IPeerData) => (
    <TextOnly
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
    >
      {data.name}
    </TextOnly>
  ),
  [ENodePeersHeaderType.Address]: (data: IPeerData) => (
    <TextOnly
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
    >
      {data.address}
    </TextOnly>
  ),
};
