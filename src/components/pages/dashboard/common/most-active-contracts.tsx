import React from 'react';
import useSWR from 'swr';

import { TableContent } from 'components/table-content';
import { DESKTOP_WIDTH, TABLET_WIDTH } from 'data/data-style';
import { MOST_ACTIVE_CONTRACTS } from 'data/table-lookup/data-contracts';
import { EDisplayTitleType, IError } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IContractsTableFetch } from 'models/models-table-contracts';
import { fetchData } from 'utils/api/queries';
import { useIsDesktop } from 'utils/dimensions';
import { autoRefreshDashboard } from 'utils/variable-evaluation';

import { Title } from './title';

export function MostActiveContracts() {
  const isDesktop = useIsDesktop();

  const { data } = useSWR<IContractsTableFetch, IError>(
    '/contracts?sort=transactionCount&size=15&direction=DESC',
    fetchData,
    autoRefreshDashboard(),
  );

  return (
    <>
      <style jsx>{`
        div.MostActiveContracts {
          margin-top: 32px;
        }

        div.MostActiveContracts :global(th),
        div.MostActiveContracts :global(thead) {
          height: 44px;
          padding: 0;
        }

        div.MostActiveContracts :global(.Table) {
          margin-top: 0;
        }

        div.table {
          margin: 12px 0 48px;
        }

        @media (min-width: ${TABLET_WIDTH}px) {
          div.MostActiveContracts {
            height: auto;
            margin: 0;
          }

          div.table {
            height: 388px;
            margin: 32px 0 0;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
          }
        }

        @media (min-width: ${DESKTOP_WIDTH}px) {
          div.MostActiveContracts {
            min-width: 583px;
          }
        }
      `}</style>
      <div className="MostActiveContracts">
        {data && <Title>Most Active Contracts</Title>}
        <div className="table">
          <TableContent
            isFilterSet={false}
            skipCardView={isDesktop}
            type={isDesktop ? EPageType.contractsMostActive : EPageType.contractsMobileMostActive}
            headerItems={MOST_ACTIVE_CONTRACTS}
            data={data ? { data: data.data } : data}
            displayTitleType={EDisplayTitleType.Normal}
            noElementsMessage=""
          />
        </div>
      </div>
    </>
  );
}
