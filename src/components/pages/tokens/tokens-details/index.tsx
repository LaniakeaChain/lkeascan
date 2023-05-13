import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import { DetailsContent } from 'components/details-content';
import { HoldersTable } from 'components/pages/holders/holders-table';
import { TransfersTable } from 'components/pages/transfers/transfers-table';
import { ErrorMessageFetch } from 'components/placeholders/error-message-fetch';
import { Loading } from 'components/placeholders/loading';
import { TabElements } from 'components/tab-elements';
import {
  HOLDERS_HEADER_ERC1155,
  HOLDERS_HEADER_ERC20,
  HOLDERS_HEADER_ERC223,
  HOLDERS_HEADER_ERC721,
  HOLDERS_HEADER_ERC777,
} from 'data/table-lookup/data-holders';
import {
  TRANSFERS_HEADER_ITEMS_ERC1155,
  TRANSFERS_HEADER_ITEMS_ERC20,
  TRANSFERS_HEADER_ITEMS_ERC223,
  TRANSFERS_HEADER_ITEMS_ERC721,
  TRANSFERS_HEADER_ITEMS_ERC777,
} from 'data/table-lookup/data-transfers';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { ITokenDetailsFetch } from 'models/models-details-tokens';
import { ITabItem } from 'models/models-table-general';
import { fetchData, pauseIfUnset } from 'utils/api/queries';
import { getLink } from 'utils/api/use-table-fetch';
import { formatHash } from 'utils/format';
import { resolveTokenNameWithSymbol } from 'utils/tokens';

import { tokenHighlightConfig, tokenOverviewConfig } from './data';

export function TokenDetails() {
  const router = useRouter();
  const { detailsHash } = router.query;

  const { data, error } = useSWR<ITokenDetailsFetch, IError>(
    pauseIfUnset('/tokens/', detailsHash),
    fetchData,
  );

  const tabItems = useMemo((): ITabItem[] => {
    if (!data) {
      return;
    }

    let currentTransfersHeaderItems;
    let holdersHeaderItems;

    if (data.contractType === 'ERC20') {
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC20;
      holdersHeaderItems = HOLDERS_HEADER_ERC20;
    } else if (data.contractType === 'ERC223') {
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC223;
      holdersHeaderItems = HOLDERS_HEADER_ERC223;
    } else if (data.contractType === 'ERC777') {
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC777;
      holdersHeaderItems = HOLDERS_HEADER_ERC777;
    } else if (data.contractType === 'ERC721') {
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC721;
      holdersHeaderItems = HOLDERS_HEADER_ERC721;
    } else if (data.contractType === 'ERC1155') {
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC1155;
      holdersHeaderItems = HOLDERS_HEADER_ERC1155;
    } else {
      // TODO add a proper default
      currentTransfersHeaderItems = TRANSFERS_HEADER_ITEMS_ERC20;
      holdersHeaderItems = HOLDERS_HEADER_ERC20;
    }

    const transfersHeaderItems = currentTransfersHeaderItems;

    const transfersConfig = {
      apiLink: `/tokens/[detailsHash]/[contractType]/[tab]`,
      pathname: '/tokens/[detailsHash]/[tab]',
      params: {
        detailsHash,
        tab: 'transfers',
        contractType: data.contractType.toLowerCase(),
      },
    };

    const holdersConfig = {
      apiLink: `/tokens/[detailsHash]/[tab]`,
      pathname: `/tokens/[detailsHash]/[tab]`,
      params: { detailsHash, tab: 'holders' },
    };

    return [
      {
        name: 'Transfers',
        link: getLink(transfersConfig),
        element: (
          <TransfersTable
            fetchConfig={transfersConfig}
            headerItems={transfersHeaderItems}
            noElementsMessage="There are no transfers to show."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
      {
        name: 'Holders',
        link: getLink(holdersConfig),
        element: (
          <HoldersTable
            fetchConfig={holdersConfig}
            headerItems={holdersHeaderItems}
            noElementsMessage="There are no holders to show."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
    ];
  }, [data, detailsHash]);

  if (error) {
    return <ErrorMessageFetch errorMessage={error.message} />;
  } else if (!data) {
    return <Loading isThrottled style={{ height: 298 }} />;
  } else {
    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Tokens',
            value: '/tokens',
          },
          {
            name: resolveTokenNameWithSymbol({
              ...data,
              address: formatHash(data.address),
            }),
            value: null,
          },
        ]}
        overviewConfig={tokenOverviewConfig(data)}
        highlightConfig={tokenHighlightConfig(data.totalSupply)}
        table={<TabElements tabItems={tabItems} />}
      />
    );
  }
}
