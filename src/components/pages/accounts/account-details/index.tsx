import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import { ACCOUNT_NFT_COLLECTION_HEADER_ITEMS } from 'data/table-lookup/data-account-nft-collection';
import { ACCOUNT_TOKENS_HEADER_ITEMS } from 'data/table-lookup/data-account-token-balances';
import { TRANSACTIONS_ACCOUNT_HEADER_ITEMS } from 'data/table-lookup/data-transactions';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { IAccountDetailsFetch } from 'models/models-details-accounts';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { containerHeight, useIsDesktop, useWindowSize } from 'utils/dimensions';
import { formatHash } from 'utils/format';
import { usePageTitle } from 'utils/page-title';

import { NftCollectionTable } from '../nft-collection-table';
import { TokenBalancesTable } from '../token-balances-table';

import { accountHighlightConfig, accountOverviewConfig } from './data';

export function AccountDetails() {
  const isDesktop = useIsDesktop();
  const windowSize = useWindowSize();
  const router = useRouter();
  // XXX this should be used with router.isReady...
  const { detailsHash } = router.query;
  const pageTitleContext = usePageTitle();

  const { data, error } = useSWR<IAccountDetailsFetch, IError>(
    pauseIfUnset('/accounts/', detailsHash),
    fetchData,
  );

  useEffect(() => {
    pageTitleContext.setTitle(detailsHash);
  }, [pageTitleContext, detailsHash]);

  const tabItems = useMemo((): ITabItem[] => {
    const transactionsConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };

    const tokensConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'tokens' },
    };

    const nftsConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'nfts' },
    };

    return [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_ACCOUNT_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this account."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
      {
        name: 'Tokens',
        link: getLink(tokensConfig),
        element: (
          <TokenBalancesTable
            fetchConfig={tokensConfig}
            noElementsMessage="There are no tokens for this account."
            displayTitleType={EDisplayTitleType.Tab}
            headerItems={ACCOUNT_TOKENS_HEADER_ITEMS}
          />
        ),
      },
      {
        name: 'NFTs',
        link: getLink(nftsConfig),
        element: (
          <NftCollectionTable
            fetchConfig={nftsConfig}
            noElementsMessage="There are no NFTs for this account."
            displayTitleType={EDisplayTitleType.Tab}
            headerItems={ACCOUNT_NFT_COLLECTION_HEADER_ITEMS}
          />
        ),
      },
    ];
  }, [detailsHash]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: containerHeight(windowSize) }} />;
  } else {
    const processedData = {
      ...data,
      display: data.links.find((i) => i.rel === 'contract')?.display || data.address,
    };

    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Accounts',
            value: null,
          },
          {
            name: formatHash(processedData.address),
            value: null,
          },
        ]}
        overviewConfig={accountOverviewConfig(processedData, isDesktop)}
        highlightConfig={accountHighlightConfig(processedData.ethBalance)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
