import { ILinkItem } from 'models/models-general';

import { IFunctionMeta } from './models-table-function';

interface ITransactionDetailsLog {
  address: string;
  data: string;
  decodedEventAbi: string;
  logIndex: number;
  topics: string[];
}

export interface ITransactionDetailsFetch {
  blockHash: string;
  blockNumber: number;
  cumulativeGasUsed: number;
  ethValue: string;
  from: string;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  hash: string;
  input: string;
  logs: ITransactionDetailsLog[];
  functionMeta?: IFunctionMeta;
  logsBloom: string;
  nonce: string;
  isPrivate: boolean;
  r: string;
  s: string;
  status: string;
  revertReason?: string;
  timestamp: number;
  timestampISO: string;
  to: string;
  transactionIndex: number;
  transactionType: string;
  v: number;
  value: number;
  verifiedTimestamp: number;
  verifiedTimestampISO: string;
  toLinks: ILinkItem[];
  fromLinks: ILinkItem[];
}
