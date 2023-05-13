import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';

export enum TAccountNftCollectionsHeaderType {
  Symbol = 'Symbol',
  Name = 'Collection',
  Amount = 'Amount',
  TokenAddress = 'Token Address',
  TokenType = 'Contract Type',
  Count = 'Count',
  Quantity = 'Quantity',
  TokenId = 'Token Id',
}

interface ICollection {
  address: string;
  name: string;
  addressLinks: ILinkItem[];
  contractType: string;
  transactionCount: number;
  lastExecutedTimestampISO: String;
  holdersCount: number;
  symbol: string;
  totalSupply: number;
}

export interface INftCollectionData {
  holderAddress: string;
  tokenAddress: string;
  tokenId: string;
  collection: ICollection;
  amount: number;
}

export interface INftCollectionResultFetch {
  paging: IPaging;
  data: INftCollectionData[];
}
