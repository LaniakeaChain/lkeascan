import React, { memo } from 'react';

import { BreadcrumbsView } from 'components/app-shell/breadcrumbs-view';
import { CardView } from 'components/card-view';
import { useIsTablerOrGreater } from 'utils/dimensions';

import { MostActiveContracts } from '../common/most-active-contracts';
import { Overview } from '../common/overview';
import { Tokens } from '../common/tokens';

import { TransactionCount } from './transaction-count';

export const DashboardDesktop = memo(() => {
  const isTabletOrGreater = useIsTablerOrGreater();

  return (
    <>
      <style jsx>{`
        div.DashboardDesktop {
          width: 100%;
          height: calc(100% - 60px);
        }
        div.bottom {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0 -12px;
        }
      `}</style>
      <BreadcrumbsView
        inlineStyle={{
          marginBottom: isTabletOrGreater ? 0 : 86,
        }}
        breadcrumbs={[
          {
            name: 'Dashboard',
            value: null,
          },
        ]}
      >
        <div className="DashboardDesktop">
          <CardView style={{ padding: '32px 4px' }}>
            <Overview />
          </CardView>
          <CardView style={{ marginTop: 24, padding: '40px 34px' }}>
            <TransactionCount />
          </CardView>
          <div className="bottom">
            <CardView
              style={{
                marginRight: 24,
                padding: '40px 34px',
                margin: '24px 12px 0',
                flexBasis: 0,
              }}
            >
              <MostActiveContracts />
            </CardView>

            <Tokens />
          </div>
        </div>
      </BreadcrumbsView>
    </>
  );
});
