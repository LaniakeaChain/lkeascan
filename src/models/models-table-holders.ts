import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';

export enum EHoldersHeaderType {
  Holder = 'Holder',
  Balances = 'Balance',
  Balances721 = 'Token Count',
  Balances1155 = 'Token Count',
}

interface ITokenBalanceData {
  tokenAddress: string;
  amount: string;
  quantity: number;
  count: string;
  symbol: string;
  lastUpdated: string;
}

export interface IHoldersData {
  holderAddress: string;
  holderAddressLinks: ILinkItem[];
  balances: ITokenBalanceData[];
}

interface ITokenMetadata {
  contractType: string;
}

export interface IHoldersTableFetch {
  paging: IPaging;
  data: IHoldersData[];
  metadata: ITokenMetadata;
}

export enum EHoldersSortAndFilterType {
  lastUpdated = 'lastUpdated',
  holderAddress = 'holderAddress',
}
