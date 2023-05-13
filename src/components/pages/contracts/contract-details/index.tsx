import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { EventsTable } from 'components/pages/events/events-table';
import { SourcesDetails } from 'components/pages/sources/sources-details';
import { InternalTransactionsTable } from 'components/pages/transactions/internal';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { DETAILS_HEIGHT } from 'data/data-style';
import { EVENTS_CONTRACTS_HEADER_ITEMS } from 'data/table-lookup/data-events-contracts';
import {
  INTERNAL_TRANSACTIONS_CONTRACT_HEADER_ITEMS,
  TRANSACTIONS_CONTRACT_HEADER_ITEMS,
} from 'data/table-lookup/data-transactions';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { IContractDetailsFetch } from 'models/models-details-contracts';
import { EPageType } from 'models/models-general';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { formatHash } from 'utils/format';

import { contractHighlightConfig, contractOverviewConfig } from './data';

export function ContractDetails() {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<IContractDetailsFetch, IError>(
    pauseIfUnset('/contracts/', detailsHash),
    fetchData,
  );

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: DETAILS_HEIGHT }} />;
  } else {
    const processedData = {
      ...data,
      display: data.links.find((i) => i.rel === 'contract')?.display || data.address,
    };

    const transactionsConfig = {
      apiLink: '/contracts/[detailsHash]/[tab]',
      pathname: '/contracts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };

    const internalTransactionsConfig = {
      apiLink: '/contracts/[detailsHash]/[tab]',
      pathname: '/contracts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'internal-transactions' },
    };

    const eventsConfig = {
      apiLink: '/contracts/[detailsHash]/[tab]',
      pathname: '/contracts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'events' },
    };

    const sourcesConfig = {
      apiLink: '/contracts/[detailsHash]/[tab]',
      pathname: '/contracts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'sources' },
    };

    const tabItems: ITabItem[] = [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_CONTRACT_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this contract."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];

    if (process.env.ENABLE_INTERNAL_TX === 'enabled') {
      tabItems.push({
        name: 'Internal-Transactions',
        label: 'Internal Txns',
        link: getLink(internalTransactionsConfig),
        element: (
          <InternalTransactionsTable
            fetchConfig={internalTransactionsConfig}
            headerItems={INTERNAL_TRANSACTIONS_CONTRACT_HEADER_ITEMS}
            noElementsMessage="There are no internal transactions for this contract."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      });
    }

    tabItems.push({
      name: 'Events',
      link: getLink(eventsConfig),
      element: (
        <EventsTable
          tablePageType={isDesktop ? EPageType.eventsContracts : EPageType.eventsContractsMobile}
          fetchConfig={eventsConfig}
          headerItems={EVENTS_CONTRACTS_HEADER_ITEMS}
          noElementsMessage="There are no events for this contract."
          displayTitleType={EDisplayTitleType.Tab}
        />
      ),
    });

    if (process.env.ENABLE_SOURCE_VERIFICATION === 'enabled') {
      tabItems.push({
        name: 'Sources',
        link: getLink(sourcesConfig),
        element: <SourcesDetails contractAddress={data.contractAddress} />,
      });
    }

    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Contracts',
            value: '/contracts',
          },
          {
            name: formatHash(processedData.contractAddress),
            value: null,
          },
        ]}
        overviewConfig={contractOverviewConfig(processedData, isDesktop)}
        highlightConfig={contractHighlightConfig(processedData.ethBalance)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
