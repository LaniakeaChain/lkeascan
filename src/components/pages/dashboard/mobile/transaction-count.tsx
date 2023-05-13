import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { LoadingSpinnerCentered } from 'components/placeholders/loading-spinner';
import { ACTIVE_PURPLE_TEXT_MOBILE, MOBILE_TEXT_VALUE } from 'data/data-style';
import { ITransactionCountFetchData } from 'models/models-dashboard';
import { IError } from 'models/models-data-general';
import { fetchData } from 'utils/api/queries';
import { FILTER_LOOKUP, Period, periods, transformFetchToTransactionChartData } from 'utils/charts';
import { formatIntegersWithComma } from 'utils/format';
import { autoRefreshDashboard, defined } from 'utils/variable-evaluation';

import { Title } from '../common/title';
import { TransactionCountChart } from '../common/transaction-count-chart';

export function TransactionCount() {
  const [timeFilter, setTimeFilter] = useState<Period>('HOURS');

  const { data } = useSWR<ITransactionCountFetchData, IError>(
    `/dashboard/transactions/totals/${timeFilter}`,
    fetchData,
    autoRefreshDashboard(),
  );

  const totalSum = data && data.data.reduce((acc, { total }) => acc + total, 0);

  useEffect(() => {
    if (data && !totalSum) {
      if (timeFilter === 'DAYS') {
        setTimeFilter('HOURS');
      } else if (timeFilter === 'HOURS') {
        setTimeFilter('MONTHS');
      }
    }
  }, [data, totalSum, timeFilter]);

  const config = useMemo(
    () => (data ? transformFetchToTransactionChartData(data.data, timeFilter) : null),
    [data, timeFilter],
  );

  return (
    <>
      <style jsx>{`
        div.TransactionCount {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 358px;
          padding-top: 32px;
        }
        div.title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: pre-wrap;
        }
        div.number {
          color: ${MOBILE_TEXT_VALUE};
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
        }
        div.chart-wrapper {
          width: 100%;
          overflow-x: scroll;
        }
        div.chart {
          width: 400%;
          height: 232px;
          margin-top: 24px;
        }
        div.dropdown {
          position: relative;
        }
        ul.filter-menu {
          position: relative;
          top: 0;
          left: -12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          list-style-type: none;
          margin-top: 12px;
        }
        li.filter-item {
        }
        button.filter-button {
          padding: 12px;
          font-size: 12px;
        }
        button.filter-button.isActive {
          color: ${ACTIVE_PURPLE_TEXT_MOBILE};
        }
      `}</style>
      <div className="TransactionCount">
        {defined(config) ? (
          <>
            <div className="title-wrapper">
              <Title>Transaction Count:</Title>
              <span> </span>
              <div className="number">{formatIntegersWithComma(config.total)}</div>
            </div>
            <ul className="filter-menu">
              {periods.map((periodId) => (
                <li key={periodId} className="filter-item">
                  <button
                    className={classNames('filter-button', { isActive: periodId === timeFilter })}
                    onClick={() => setTimeFilter(periodId)}
                  >
                    {FILTER_LOOKUP[periodId]}
                  </button>
                </li>
              ))}
            </ul>
            <div className="chart-wrapper">
              <div className="chart">
                <TransactionCountChart
                  transactionCountData={data}
                  transactionCount={config}
                  timeFilter={timeFilter}
                />
              </div>
            </div>
          </>
        ) : (
          <LoadingSpinnerCentered />
        )}
      </div>
    </>
  );
}
