import React from 'react';

import { TextViewerWrapper } from 'components/inputs/text-viewer-modal';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { INodeDetailsFetch } from 'models/models-node-details';
import { formatHash, formatHashLong, formatIntegersWithComma } from 'utils/format';

export function nodeDetailsConfig(fetch: INodeDetailsFetch, isDesktop: boolean) {
  const { address, enode, id, name } = fetch;
  return {
    titleConfig: {
      label: 'Node Details',
    },

    subtitleConfig: {
      value: '1' + id.toString(),
      label: isDesktop ? formatHashLong(id) : formatHash(id),
      isNoRenameIcon: true,
    },
    info: [
      [{ name: 'Name', value: name }],
      [
        {
          name: 'Enode',
          value: <TextViewerWrapper title="Enode">{enode}</TextViewerWrapper>,
        },
        { name: 'Address', value: address },
      ],
    ],
  };
}

export function blockHighlightConfig(transactionCount: number): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Peer Count',
    value: formatIntegersWithComma(transactionCount),
  };
}
