import Chart, { ChartData, ChartTooltipItem } from 'chart.js';
import React from 'react';

import { CustomChart, EChartType } from 'components/charts';
import { GRID_LINE_COLOR, GRID_NUMBER_COLOR, TOOLTIP_STYLE_CONFIG } from 'data/data-style';
import { ITransactionCountChartData, ITransactionCountFetchData } from 'models/models-dashboard';
import { roundUpToNearestAllZeros } from 'utils/charts';
import { formatIntegersWithComma, formatWithCommas } from 'utils/format';

interface Props {
  timeFilter: string;
  transactionCount: ITransactionCountChartData;
  transactionCountData?: ITransactionCountFetchData;
}

export function TransactionCountChart(props: Props) {
  const { timeFilter, transactionCount } = props;

  const itemSortReverse = (itemA: ChartTooltipItem, itemB: ChartTooltipItem) =>
    itemB.datasetIndex - itemA.datasetIndex;

  return (
    <CustomChart
      id={`TransactionCountChart ${timeFilter}`}
      data={transactionCount}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          ...TOOLTIP_STYLE_CONFIG,
          mode: 'index',
          itemSort: itemSortReverse,
          callbacks: {
            title: (tooltipItem: ChartTooltipItem[]) => {
              const count = tooltipItem.reduce((a: number, c: ChartTooltipItem) => {
                a += c.yLabel as number;
                return a;
              }, 0);

              return `Transaction Count - ${formatIntegersWithComma(count)}`;
            },
            label: (tooltipItem: ChartTooltipItem, data: ChartData) =>
              `${data.datasets[tooltipItem.datasetIndex].label} - ${formatWithCommas(
                tooltipItem.yLabel,
              )}`,
            labelColor: (tooltipItem: ChartTooltipItem, chart: Chart) => {
              const { datasetIndex } = tooltipItem;

              const backgroundColor = chart.config.data.datasets[datasetIndex]
                .backgroundColor as string[];

              return {
                borderColor: 'transparent',
                backgroundColor,
              };
            },
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                labelString: 'Value',
              },
              stacked: true,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                fontColor: GRID_NUMBER_COLOR,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                labelString: 'Value',
              },
              stacked: true,
              ticks: {
                stepSize: Math.ceil(roundUpToNearestAllZeros(transactionCount.max) / 5),
                beginAtZero: true,
                fontColor: GRID_NUMBER_COLOR,
                padding: 24,
                callback: (label) => formatWithCommas(label),
              },
              afterTickToLabelConversion: (scaleInstance) => {
                scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;
              },
              gridLines: {
                borderDash: [2, 5],
                drawBorder: false,
                zeroLineWidth: 0,
                color: GRID_LINE_COLOR,
              },
            },
          ],
        },
      }}
      type={EChartType.Bar}
    />
  );
}
