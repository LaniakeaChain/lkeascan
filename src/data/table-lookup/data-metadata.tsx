import React from 'react';

import { CellContractsCount } from 'components/pages/metadata/metadata-table/cell-contracts-count';
import MetadataOptionDelete from 'components/pages/metadata/metadata-table/cell-contracts-count/metadata-options-control/metadata-option-delete';
import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EMetadataHeaderType, IMetadataData } from 'models/models-table-metadata';

export const METADATA_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: EMetadataHeaderType.Name,
    headerIconType: null,
    fixedWidth: 248,
  },
  {
    headerType: EMetadataHeaderType.ContractsCount,
    headerIconType: null,
  },
];

export const METADATA_CELL_LOOKUP: IHeaderDictionary<(data: IMetadataData) => JSX.Element> = {
  [EMetadataHeaderType.Name]: (data: IMetadataData) => (
    <CellHash
      contentToCopy={data.fileId}
      linkConfig={{
        href: `/metadata/[detailsHash]`,
        as: `/metadata/${data.fileId}`,
      }}
    >
      {data.name}
    </CellHash>
  ),
  [EMetadataHeaderType.ContractsCount]: (data: IMetadataData) => (
    <CellContractsCount
      count={data.contractCount}
      options={[
        {
          name: 'Delete',
          component: <MetadataOptionDelete name={data.name} metadataFileId={data.fileId} />,
        },
      ]}
    />
  ),
};
