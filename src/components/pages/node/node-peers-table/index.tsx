import React from 'react';

import { TableContent } from 'components/table-content';
import { NODE_PEERS_HEADER_ITEMS } from 'data/table-lookup/data-node-peers';
import { EDisplayTitleType } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IPeersTableFetch } from 'models/models-table-peers';
import { useIsDesktop } from 'utils/dimensions';

interface Props {
  data: IPeersTableFetch;
}

export function NodePeersTable({ data }: Props) {
  const isDesktop = useIsDesktop();
  return (
    <TableContent
      breadcrumbs={[
        {
          name: 'Peers',
          value: null,
        },
      ]}
      isFilterSet={false}
      headerItems={NODE_PEERS_HEADER_ITEMS}
      noElementsMessage={'There are no peers to show.'}
      displayTitleType={EDisplayTitleType.Tab}
      type={isDesktop ? EPageType.nodePeers : EPageType.nodePeersMobile}
      data={data}
    />
  );
}
