import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { IError } from 'models/models-data-general';
import { INodeDetailsFetch } from 'models/models-node-details';
import { ITabItem } from 'models/models-table-general';
import { fetchData } from 'utils/api/queries';
import { useIsDesktop } from 'utils/dimensions';

import { blockHighlightConfig, nodeDetailsConfig } from './data';
import { NodePeersTable } from './node-peers-table';

export function NodeDetails() {
  const isDesktop = useIsDesktop();
  const { data, error } = useSWR<INodeDetailsFetch, IError>('/node/details', fetchData);

  const tabItems = useMemo(
    (): ITabItem[] =>
      data && [
        {
          name: 'Peers',
          link: { href: '/network?tab=peers', as: '/network/peers' },
          element: (
            <NodePeersTable
              data={{
                data: data.peers,
                paging: { totalElements: data.peers.length },
              }}
            />
          ),
        },
      ],
    [data],
  );

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: 298 }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Network',
            value: '/network',
          },
        ]}
        overviewConfig={nodeDetailsConfig(data, isDesktop)}
        highlightConfig={blockHighlightConfig(data.peerCount)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
