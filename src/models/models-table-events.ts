import { IPaging } from './models-data-general';
import { IBasicParameter } from './models-general';

export enum EEventsHeaderType {
  Address = 'Address',
  Name = 'Name',
  Parameters = 'Parameters',
  TransactionHash = 'Transaction Hash',
  Time = 'Time',
}

export interface IEventsData {
  blockNumber: number;
  eventName: string;
  parameters: IBasicParameter[];
  length: number;
  to: string;
  timestampISO: string;
  transactionHash: string;
}

export interface IEventsTableFetch {
  data: IEventsData[];
  paging: IPaging;
}

export enum EEventsSortAndFilterType {
  blockNumber = 'blockNumber',
  timestampISO = 'timestampISO',
  eventName = 'eventName',
  logIndex = 'logIndex',
  transactionIndex = 'transactionIndex',
}
