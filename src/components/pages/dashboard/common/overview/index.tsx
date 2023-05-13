import React from 'react';
import useSWR from 'swr';

import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { DESKTOP_WIDTH, TABLET_WIDTH } from 'data/data-style';
import { IDashboardData, IDashboardFetch } from 'models/models-dashboard';
import { IError } from 'models/models-data-general';
import { themed } from 'theming';
import { fetchData } from 'utils/api/queries';
import { autoRefreshDashboard } from 'utils/variable-evaluation';

import DashboardItem from './dashboard-item';

type Totals = { [key: string]: IDashboardData };

export function Overview() {
  const { data } = useSWR<IDashboardFetch, IError>(
    '/dashboard/totals',
    fetchData,
    autoRefreshDashboard(),
  );

  const totals: Totals = {};

  if (data) {
    data.data.forEach((item) => (totals[item.name] = item));
  }

  return (
    <>
      <style jsx>{`
        div.Overview {
          display: flex;
          flex-direction: column;
          padding: 32px 0;
        }

        @media (min-width: ${TABLET_WIDTH}px) {
          div.Overview {
            padding: 0 32px;
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        @media (min-width: ${DESKTOP_WIDTH}px) {
          div.Overview {
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0;
          }
        }
      `}</style>
      <div className="Overview">
        {data ? (
          <>
            <DashboardItem
              href="/transactions"
              label="Total Transactions Created"
              value={totals.transactions.total}
            />
            <DashboardItem href="/tokens" label="Total Tokens" value={totals.tokens.total} />
            <DashboardItem
              href="/contracts"
              label="Total Contracts Created"
              value={totals.contracts.total}
            />
            {themed('accountTabEnabled') && (
              <DashboardItem
                href="#"
                label={`Active Accounts`}
                value={totals.nativeToken.total}
                isLast={!themed('networkEnabled')}
              />
            )}
            {(themed('networkEnabled') || process.env.DISPLAY_NETWORK_TAB === 'enabled') && (
              <DashboardItem
                href="/network"
                label="Total Peers"
                value={totals.peerCount.total}
                isLast
              />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
