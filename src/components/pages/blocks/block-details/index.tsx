import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { TRANSACTIONS_BLOCK_HEADER_ITEMS } from 'data/table-lookup/data-transactions';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { IBlockDetailsFetch } from 'models/models-details-blocks';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { formatHash } from 'utils/format';

import { blockHighlightConfig, blockOverviewConfig } from './data';

export function BlockDetails() {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<IBlockDetailsFetch, IError>(
    pauseIfUnset('/blocks/', detailsHash),
    fetchData,
  );

  const tabItems = useMemo((): ITabItem[] => {
    const transactionsConfig = {
      apiLink: '/blocks/[detailsHash]/[tab]',
      pathname: '/blocks/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };

    return [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_BLOCK_HEADER_ITEMS}
            noElementsMessage="There are no transactions in this block."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];
  }, [detailsHash]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: 298 }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Blocks',
            value: '/blocks',
          },
          {
            name: formatHash(data.hash),
            value: null,
          },
        ]}
        overviewConfig={blockOverviewConfig(data, isDesktop)}
        highlightConfig={blockHighlightConfig(data.transactionCount)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
