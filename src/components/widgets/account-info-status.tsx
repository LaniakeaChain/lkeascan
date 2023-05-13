import React from 'react';
import useSWR from 'swr';

import { ESyncStatus, ISyncStatus } from 'models/models-data-general';
import { fetchData } from 'utils/api/queries';

interface StatusConnectRenderProps {
  status: ESyncStatus;
  latestBlock: string;
  latestIndexedBlock: string;
}

interface StatusConnectProps {
  render(props: StatusConnectRenderProps): JSX.Element;
}

export function StatusConnect(props: StatusConnectProps) {
  const { data } = useSWR<ISyncStatus>('/actuator/health', fetchData, { refreshInterval: 1000 });
  const legacyStatus = data?.status;
  const nodeStatus = data?.components?.node.status;
  const latestBlock = data?.components.node.details?.latestBlock;
  const latestIndexedBlock = data?.components.node.details?.latestIndexedBlock;

  return (
    <>
      {props.render({
        status: nodeStatus ?? legacyStatus,
        latestBlock: latestBlock,
        latestIndexedBlock: latestIndexedBlock,
      })}
    </>
  );
}
