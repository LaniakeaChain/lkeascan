import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';
import { IFunctionMeta } from './models-table-function';
import { ETagType } from './models-tags';

export enum EInternalTransactionsHeaderType {
  ParentHash = 'ParentHash',
  Function = 'Function',
  Type = 'Type',
  To = 'To',
  From = 'From',
  Value = 'Value',
  Time = 'Time',
}

export enum ETransactionsHeaderType {
  Type = 'Type',
  Hash = 'Hash',
  Function = 'Function',
  From = 'From',
  To = 'To',
  Value = 'Value',
  Time = 'Time',
}

export interface ITransactionsData {
  direction: ETransactionsDirection;
  timestamp: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  timestampISO: string;
  transactionType: ETagType;
  functionMeta: IFunctionMeta;
  isPrivate: boolean;
  ethValue: string;
  detailsHash?: string;
  status?: string;
  revertReason?: string;
  fromLinks: ILinkItem[];
  toLinks: ILinkItem[];
}

export interface ITransactionsTableFetch {
  paging: IPaging;
  data: ITransactionsData[];
}

export interface IInternalTransactionsData {
  direction: string;
  id: string;
  parentHash: string;
  blockNumber: string;
  from: string;
  to: string;
  value: string;
  timestampISO: string;
  input: string;
  transactionType: string;
  ethValue: string;
  detailsHash?: string;
  fromLinks: ILinkItem[];
  toLinks: ILinkItem[];
  functionMeta: IFunctionMeta;
}

export interface IInternalTransactionsTableFetch {
  paging: IPaging;
  data: IInternalTransactionsData[];
}

export enum ETransactionsSortAndFilterType {
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

export enum ETransactionsTransactionType {
  ContractCall = 'Contract Call',
  Transfer = 'Transfer',
  ContractCreation = 'Contract Creation',
}

enum ETransactionsDirection {
  In = 'In',
  Out = 'Out',
  Self = 'Self',
}
