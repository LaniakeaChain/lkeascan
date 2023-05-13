import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { ContractsTable } from 'components/pages/contracts/contracts-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { DETAILS_HEIGHT } from 'data/data-style';
import { CONTRACTS_METADATA_HEADER_ITEMS } from 'data/table-lookup/data-contracts';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { IMetadataDetailsFetch } from 'models/models-details-metadata';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';

import { metadataOverviewConfig } from './data';

export function MetadataDetails() {
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<IMetadataDetailsFetch, IError>(
    pauseIfUnset('/metadata/', detailsHash),
    fetchData,
  );

  const tabItems = useMemo((): ITabItem[] => {
    const contractsConfig = {
      apiLink: '/metadata/[detailsHash]/[tab]',
      pathname: '/metadata/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'contracts' },
    };

    return [
      {
        name: 'Contracts',
        link: getLink(contractsConfig),
        element: (
          <ContractsTable
            fetchConfig={contractsConfig}
            headerItems={CONTRACTS_METADATA_HEADER_ITEMS}
            noElementsMessage="There are no contracts for this metadata entry."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];
  }, [detailsHash]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: DETAILS_HEIGHT }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Metadata',
            value: '/metadata',
          },
          {
            name: data.name,
            value: null,
          },
        ]}
        overviewConfig={metadataOverviewConfig(data)}
        highlightConfig={null}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
