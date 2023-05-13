import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { EventsTable } from 'components/pages/events/events-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { TableContent } from 'components/table-content';
import { DETAILS_HEIGHT } from 'data/data-style';
import { EVENTS_TRANSACTIONS_HEADER_ITEMS } from 'data/table-lookup/data-events-transactions';
import { FUNCTION_TRANSACTIONS_HEADER_ITEMS } from 'data/table-lookup/data-function-transactions';
import { INTERNAL_TRANSACTIONS_CONTRACT_HEADER_ITEMS } from 'data/table-lookup/data-transactions';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { ITransactionDetailsFetch } from 'models/models-details-transactions';
import { EPageType } from 'models/models-general';
import { IFunctionTableFetch } from 'models/models-table-function';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { formatHash } from 'utils/format';

import { InternalTransactionsTable } from '../internal';

import { transactionOverviewConfig, transactionsHighlightConfig } from './data';

const TypesToDecode = ['ContractCall', 'Transfer'];

function toPseudoParams(input: string) {
  return input.match(/.{64}/g).map((bytes) => ({
    direction: '',
    name: '',
    type: 'bytes32',
    value: bytes,
    transactionHash: '',
  }));
}

export function TransactionDetails() {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<ITransactionDetailsFetch, IError>(
    pauseIfUnset('/transactions/', detailsHash),
    fetchData,
  );

  const transactionFunctionInfo = useMemo((): IFunctionTableFetch => {
    if (!data) return;

    if (data.functionMeta) {
      return {
        data: [
          {
            functionName: data.functionMeta.functionName,
            parameters: data.functionMeta.params,
          },
        ],
      };
    } else if (
      // We are including transfers until internal TXs support
      TypesToDecode.includes(data.transactionType) &&
      data.input.length > 10
    ) {
      return {
        data: [
          {
            functionName: data.input.slice(0, 10),
            parameters: toPseudoParams(data.input.slice(10)),
          },
        ],
      };
    } else if (data.transactionType === 'ContractCreation') {
      return {
        data: [
          {
            functionName: 'constructor',
            parameters: [],
          },
        ],
      };
    } else {
      return {
        data: [],
      };
    }
  }, [data]);

  const tabItems = useMemo((): ITabItem[] => {
    const eventsConfig = {
      apiLink: '/transactions/[detailsHash]/[tab]',
      pathname: '/transactions/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'events' },
    };

    const internalTransactionsConfig = {
      apiLink: '/transactions/[detailsHash]/[tab]',
      pathname: '/transactions/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'internal-transactions' },
    };

    const tabs: ITabItem[] = [
      {
        name: 'Function',
        // This isn't a real table with paging etc,
        // it is only used to display a single entry
        link: getLink({
          pathname: '/transactions/[detailsHash]/[tab]',
          params: { detailsHash, tab: 'function' },
        }),
        element: (
          <TableContent
            isFilterSet={false}
            noElementsMessage="There is no function metadata for this transaction."
            displayTitleType={EDisplayTitleType.Tab}
            type={isDesktop ? EPageType.functionTransactions : EPageType.functionTransactionsMobile}
            headerItems={FUNCTION_TRANSACTIONS_HEADER_ITEMS}
            data={transactionFunctionInfo}
          />
        ),
      },
      {
        name: 'Events',
        link: getLink(eventsConfig),
        element: (
          <EventsTable
            tablePageType={
              isDesktop ? EPageType.eventsTransactions : EPageType.eventsTransactionsMobile
            }
            fetchConfig={eventsConfig}
            headerItems={EVENTS_TRANSACTIONS_HEADER_ITEMS}
            noElementsMessage="There are no events for this transaction."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];

    if (process.env.ENABLE_INTERNAL_TX === 'enabled') {
      tabs.push({
        name: 'Internal-Transactions',
        label: 'Internal Txns',
        link: getLink(internalTransactionsConfig),
        element: (
          <InternalTransactionsTable
            fetchConfig={internalTransactionsConfig}
            headerItems={INTERNAL_TRANSACTIONS_CONTRACT_HEADER_ITEMS}
            noElementsMessage="There are no internal transactions."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      });
    }

    return tabs;
  }, [detailsHash, isDesktop, transactionFunctionInfo]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: DETAILS_HEIGHT }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Transactions',
            value: '/transactions',
          },
          {
            name: formatHash(data.hash),
            value: null,
          },
        ]}
        overviewConfig={transactionOverviewConfig(data, isDesktop)}
        highlightConfig={transactionsHighlightConfig(data.ethValue)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
