import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { ToolTipCellCopy } from 'components/table-content/desktop/table/table-data-row/cell-tool-tip-copy';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { ENodePeersHeaderType, IPeerData } from 'models/models-table-peers';
import { formatHash } from 'utils/format';

export const NODE_PEERS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ENodePeersHeaderType.ID,
    fixedWidth: 173,
  },
  {
    headerType: ENodePeersHeaderType.Name,
  },
  {
    headerType: ENodePeersHeaderType.Address,
  },
];

export const NODE_PEERS_CELL_LOOKUP: IHeaderDictionary<(data: IPeerData) => JSX.Element> = {
  [ENodePeersHeaderType.ID]: (data: IPeerData) => (
    <CellHash contentToCopy={data.id}>{formatHash(data.id)}</CellHash>
  ),
  [ENodePeersHeaderType.Name]: (data: IPeerData) => (
    <>
      <style jsx>{`
        div.CellHash {
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
      <div className="CellHash">
        <ToolTipCellCopy style={{ right: 0 }} contentToCopy={data.name}>
          {data.name}
        </ToolTipCellCopy>
      </div>
    </>
  ),
  [ENodePeersHeaderType.Address]: (data: IPeerData) => <TextOnly>{data.address}</TextOnly>,
};
