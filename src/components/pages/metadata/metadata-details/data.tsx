import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { IOverviewContentProps } from 'models/models-details-general';
import { IMetadataData } from 'models/models-table-metadata';
import { formatHash } from 'utils/format';

export function metadataOverviewConfig(detailsFetch: IMetadataData): IOverviewContentProps {
  const { fileId, name } = detailsFetch;
  return {
    titleConfig: {
      label: 'Contract Metadata Details',
    },
    subtitleConfig: {
      value: name || fileId,
      label: name,
      isNoCopyIcon: true,
      isNoRenameIcon: true,
    },
    info: [
      [
        {
          name: 'ID',
          value: (
            <ToolTipContentInline contentToCopy={fileId}>{formatHash(fileId)}</ToolTipContentInline>
          ),
        },
      ],
    ],
  };
}
