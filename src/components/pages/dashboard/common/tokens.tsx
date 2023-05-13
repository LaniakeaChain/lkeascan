import Chart, { ChartData, ChartLegendLabelItem, ChartTooltipItem } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import useSWR from 'swr';

import { CardView } from 'components/card-view';
import { CustomChart, EChartType } from 'components/charts';
import { TABLET_WIDTH, TOOLTIP_STYLE_CONFIG } from 'data/data-style';
import { IDashboardFetch } from 'models/models-dashboard';
import { IError } from 'models/models-data-general';
import { fetchData } from 'utils/api/queries';
import { transformFilterArrayToString } from 'utils/api/queries-format';
import { transformFetchToTokensChartData } from 'utils/charts';
import { useIsTablerOrGreater } from 'utils/dimensions';
import { formatWithCommas } from 'utils/format';
import { autoRefreshDashboard } from 'utils/variable-evaluation';

import { Title } from './title';

export function Tokens() {
  const router = useRouter();
  const isTabletOrGreater = useIsTablerOrGreater();

  const { data } = useSWR<IDashboardFetch, IError>(
    '/dashboard/tokens/totals',
    fetchData,
    autoRefreshDashboard(),
  );

  let config;

  if (data) {
    config = transformFetchToTokensChartData(data.data);
  }

  const totalSum = data && data.data.reduce((acc, { total }) => acc + total, 0);

  const handleClick = useCallback(
    (_, elements) => {
      if (elements.length !== 1) return;
      const value: string = data.data[(elements[0] as { _index: number })._index].name;
      const filter = transformFilterArrayToString({ contractType: [value] });

      router.push({
        pathname: '/tokens',
        query: { filter },
      });
    },
    [data, router],
  );

  const content = (
    <>
      <style jsx>{`
        div.Tokens {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 393px;
          height: 448px;
        }
        div.chart {
          margin-top: 24px;
          width: 100%;
          height: calc(100% - 102px);
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.Tokens {
            width: 100%;
            padding-top: 32px;
          }
        }
      `}</style>
      {config && (
        <div className="Tokens">
          <Title>Tokens</Title>
          <div className="chart">
            <CustomChart
              id="Tokens pie chart"
              data={config}
              options={{
                onClick: handleClick,
                responsive: true,
                maintainAspectRatio: false,
                rotation: Math.PI * 0.15,
                tooltips: {
                  ...TOOLTIP_STYLE_CONFIG,
                  callbacks: {
                    label: (tooltipItem: ChartTooltipItem, chartData: ChartData) => {
                      const { index } = tooltipItem;

                      const total = (chartData.datasets[0].data as number[]).reduce(
                        (a: number, b: number) => a + b,
                        0,
                      );

                      return `${chartData.labels[index]} - ${formatWithCommas(
                        chartData.datasets[0].data[index] as number,
                      )} - ${(
                        ((chartData.datasets[0].data[index] as number) * 100) /
                        total
                      ).toFixed(0)}%`;
                    },
                    labelColor: (tooltipItem, chart: Chart) => {
                      const { index } = tooltipItem;

                      const backgroundColor = chart.config.data.datasets[0]
                        .backgroundColor as string[];

                      return {
                        borderColor: 'transparent',
                        backgroundColor: backgroundColor[index],
                      };
                    },
                  },
                },
                legend: {
                  position: 'bottom',
                  labels: {
                    fontColor: '#667281',
                    fontSize: 16,
                    padding: 12,
                    generateLabels: (chart: Chart): ChartLegendLabelItem[] => {
                      const chartData: ChartData = chart.config.data;
                      const { backgroundColor, data: datasetData } = chartData.datasets[0];
                      return chartData.labels.map((label, index) => ({
                        datasetIndex: index,
                        fillStyle: backgroundColor[index],
                        lineWidth: 1,
                        strokeStyle: 'transparent',
                        text: `${label as string} - ${formatWithCommas(
                          datasetData[index] as number,
                        )}`,
                      }));
                    },
                  },
                },
              }}
              type={EChartType.Pie}
            />
          </div>
        </div>
      )}
    </>
  );

  return totalSum ? (
    isTabletOrGreater ? (
      <CardView
        style={{
          padding: '40px 34px',
          margin: '24px 12px 0',
        }}
      >
        {content}
      </CardView>
    ) : (
      content
    )
  ) : null;
}
