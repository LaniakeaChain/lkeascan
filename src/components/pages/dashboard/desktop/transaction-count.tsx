import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { DropdownControl } from 'components/inputs/dropdown-control';
import { DropdownContentBasic } from 'components/inputs/dropdown-control/dropdown-content-basic';
import { DropdownWrapper } from 'components/inputs/dropdown-control/dropdown-wrapper';
import { LoadingSpinnerCentered } from 'components/placeholders/loading-spinner';
import { MOBILE_TEXT } from 'data/data-style';
import { ITransactionCountFetchData } from 'models/models-dashboard';
import { IError } from 'models/models-data-general';
import { IDropdownOption } from 'models/models-inputs';
import { fetchData } from 'utils/api/queries';
import { FILTER_LOOKUP, Period, periods, transformFetchToTransactionChartData } from 'utils/charts';
import { formatIntegersWithComma } from 'utils/format';
import { autoRefreshDashboard } from 'utils/variable-evaluation';

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

  const handleFilterChange = useCallback((option: IDropdownOption<Period>) => {
    setTimeFilter(option.value);
  }, []);

  return (
    <>
      <style jsx>{`
        div.TransactionCount {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 358px;
        }
        div.title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        div.count {
          margin-top: 24px;
        }
        div.number {
          color: ${MOBILE_TEXT};
          font-weight: 600;
          font-size: 36px;
          line-height: 44px;
        }
        div.chart {
          width: 100%;
          height: 232px;
          margin-top: 24px;
        }
        div.dropdown {
          position: relative;
        }
      `}</style>
      <div className="TransactionCount">
        {data ? (
          <>
            <div className="title-wrapper">
              <Title>Transaction Count</Title>
              <div className="dropdown">
                <DropdownControl label={FILTER_LOOKUP[timeFilter]} isChevron>
                  <DropdownWrapper>
                    <DropdownContentBasic
                      style={{
                        fontSize: 14,
                        lineHeight: '16px',
                        color: '#494C5C',
                        width: 128,
                        right: 0,
                        left: 'auto',
                      }}
                      onChange={handleFilterChange}
                    >
                      {periods.map((period) => ({
                        label: FILTER_LOOKUP[period],
                        value: period,
                      }))}
                    </DropdownContentBasic>
                  </DropdownWrapper>
                </DropdownControl>
              </div>
            </div>
            <div className="count">
              <div className="number">{formatIntegersWithComma(config.total)}</div>
            </div>
            <div className="chart">
              <TransactionCountChart
                transactionCountData={data}
                transactionCount={config}
                timeFilter={timeFilter}
              />
            </div>
          </>
        ) : (
          <LoadingSpinnerCentered />
        )}
      </div>
    </>
  );
}
