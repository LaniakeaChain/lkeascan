import React, { memo } from 'react';

import { MOBILE_LIGHT_GREY } from 'data/data-style';

import { MostActiveContracts } from '../common/most-active-contracts';
import { Overview } from '../common/overview';
import { Tokens } from '../common/tokens';

import { TransactionCount } from './transaction-count';

export const DashboardMobile = memo(() => (
  <>
    <style jsx>{`
      div.DashboardMobile {
        width: 100%;
        height: calc(100% - 60px);
      }
      div.bottom {
        display: flex;
        flex-direction: column;
      }
      div.line {
        width: 100%;
        height: 1px;
        background-color: ${MOBILE_LIGHT_GREY};
      }
    `}</style>
    <div className="DashboardMobile">
      <Overview />
      <div className="line" />
      <TransactionCount />
      <div className="line" />
      <div className="bottom">
        <Tokens />
        <div className="line" />
        <MostActiveContracts />
      </div>
    </div>
  </>
));
