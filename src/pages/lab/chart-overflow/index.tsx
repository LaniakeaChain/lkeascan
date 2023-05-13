import { motion } from 'framer-motion';
import React, { RefObject, createRef, useState } from 'react';

import { CustomHead } from 'components/app-shell/custom-head';
import { GLOBAL_STYLES } from 'components/app-shell/styles';
import { TransactionCountChart } from 'components/pages/dashboard/common/transaction-count-chart';
import { DASHBOARD_FIXTURES } from 'data/data-dashboard-fixtures';
import { defined } from 'utils/variable-evaluation';

const ref: RefObject<HTMLDivElement> = createRef();

export interface ICoord {
  x: number;
  y: number;
}

export interface IPanInfo {
  point: ICoord;
  delta: ICoord;
  offset: ICoord;
  velocity: ICoord;
}

export default () => {
  const [panX, setPan] = useState(0);
  const [panVelocity, setPanVelocity] = useState(null);
  const [endedVelocity, setEndedVelocity] = useState(null);

  const handlePan = (event: PointerEvent, info: IPanInfo) => {
    if (ref) {
      const target = event.target as HTMLDivElement;
      const nextPanX = panX + info.offset.x;

      if (ref.current.clientWidth - target.clientWidth < nextPanX && 0 > nextPanX) {
        setPanVelocity(info.velocity.x);
        setEndedVelocity(null);
        setPan(nextPanX);
      }
    }
  };

  const handlePanEnd = (_: PointerEvent, info: IPanInfo) => {
    setEndedVelocity(info.velocity);
  };

  return (
    <>
      {GLOBAL_STYLES}
      <style jsx>{`
        div.ChartOverflow {
          position: relative;
          padding: 0 100px;
        }
        div.chart-wrapper {
          width: 100%;
        }
        div.chart-wrapper-scroll {
          width: 100%;
          overflow-y: scroll;
        }
        div.chart-no-overflow {
          width: 100%;
          height: 232px;
          margin-top: 24px;
        }
        div.chart-overflow {
          width: 200%;
          height: 232px;
          margin-top: 24px;
        }
        :global(.chart-overflow-pan) {
          width: 200%;
          height: 232px;
          margin-top: 24px;
          cursor: grab;
        }
        :global(.chart-overflow-pan:active) {
          cursor: grabbing;
        }
      `}</style>
      <CustomHead />
      <div className="ChartOverflow">
        <div className="chart-wrapper">
          <h2>No overflow, just all chart data fits in wrapper</h2>
          <div className="chart-no-overflow">
            <TransactionCountChart
              timeFilter="Last 30 Days"
              transactionCount={DASHBOARD_FIXTURES.transactionCount}
            />
          </div>
        </div>
        <div className="chart-wrapper-scroll">
          <h2>Horizontal scroll overflow, chart is 2 x size of wrapper</h2>
          <div className="chart-overflow">
            <TransactionCountChart
              timeFilter="Last 30 Days"
              transactionCount={DASHBOARD_FIXTURES.transactionCount}
            />
          </div>
        </div>
        <div ref={ref} className="chart-wrapper">
          <h2>Horizontal pan overflow, chart is 2 x size of wrapper</h2>
          <motion.div
            className="chart-overflow-pan"
            animate={{ x: panX }}
            transition={
              defined(endedVelocity)
                ? { type: 'inertia', velocity: endedVelocity }
                : { type: 'tween', velocity: panVelocity, ease: 'linear' }
            }
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            <TransactionCountChart
              timeFilter="Last 30 Days"
              transactionCount={DASHBOARD_FIXTURES.transactionCount}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};
