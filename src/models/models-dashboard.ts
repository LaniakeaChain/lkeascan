import { ILinkItem } from './models-general';

export interface IDashboardData {
  name: string;
  total: number;
  links: ILinkItem[];
}

export interface IDashboardFetch {
  data: IDashboardData[];
}

interface ITokensChartDataSet {
  data: number[];
  backgroundColor: string[];
}

export interface ITokensChartData {
  datasets: ITokensChartDataSet[];
  labels: string[];
}

export interface ITransactionCountData extends IDashboardData {
  fromTimestampISO: string;
  toTimestampISO: string;
}

export interface ITransactionCountFetchData extends IDashboardData {
  data: ITransactionCountData[];
}

export interface ITransactionCountChartDataSet {
  data: number[];
  backgroundColor: string;
  barThickness?: number | 'flex' | undefined;
  label: string;
}

export interface ITransactionCountChartData {
  datasets: ITransactionCountChartDataSet[];
  labels: string[];
  total: number;
  max: number;
}
