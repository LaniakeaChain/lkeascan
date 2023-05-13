import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { TextTruncate } from 'components/text-truncate';
import { IHeaderDictionary } from 'models/models-data-general';
import { EMetadataHeaderType, IMetadataData } from 'models/models-table-metadata';
import { formatWithCommas } from 'utils/format';

export const METADATA_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: IMetadataData,
) => JSX.Element> = {
  [EMetadataHeaderType.Name]: (data: IMetadataData) => (
    <InlineHash
      contentToCopy={data.fileId}
      linkConfig={{
        href: `/metadata/[detailsHash]`,
        as: `/metadata/${data.fileId}`,
      }}
    >
      {data.name}
    </InlineHash>
  ),
  [EMetadataHeaderType.ContractsCount]: (data: IMetadataData) => (
    <TextTruncate>
      {data.contractCount === 0 ? '0' : formatWithCommas(data.contractCount)}
    </TextTruncate>
  ),
};
