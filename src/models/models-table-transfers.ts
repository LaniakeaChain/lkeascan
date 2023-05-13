import { ILinkItem } from 'models/models-general';

import { IPaging } from './models-data-general';

export enum ETransfersHeaderType {
  Hash = 'Hash',
  Quantity = 'Quantity',
  TokenId = 'TokenId',
  From = 'From',
  To = 'To',
  Time = 'Time',
  Amount = 'Amount',
}

export interface ITransfersData {
  hash: string;
  value: string;
  private: boolean;
  timestampISO: string;
  detailsHash?: string;
  quantity: string;
  tokenId: string;
  amount: string;
  toLinks: ILinkItem[];
  fromLinks: ILinkItem[];
}

export interface ITransfersTableFetch {
  paging: IPaging;
  data: ITransfersData[];
}

export enum ETransfersSortAndFilterType {
  blockNumber = 'blockNumber',
  created = 'created',
  lastExecuted = 'lastExecuted',
  timestampISO = 'timestampISO',
  from = 'from',
  to = 'to',
  blockHash = 'blockHash',
  transactionType = 'transactionType',
  functionName = 'functionName',
  ethValue = 'ethValue',
  direction = 'direction',
}
