import { IPaging } from './models-data-general';
import { ETagType } from './models-tags';

export enum ETokensHeaderType {
  Type = 'Type',
  Name = 'Name',
  TotalSupply = 'Total Supply',
  TransactionCount = 'Transaction Count',
  LastExecution = 'Last Execution',
  Holders = 'Holders',
  Symbol = 'Symbol',
}

export interface ITokensData {
  address: string;
  contractType: ETagType;
  decimals: number;
  lastExecutedTimestampISO: string;
  name?: string;
  symbol?: string;
  totalSupply: number;
  transactionCount: number;
  holdersCount: number;
}

export interface ITokensTableFetch {
  paging: IPaging;
  data: ITokensData[];
}

export enum ETokensSortAndFilterType {
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
  totalSupply = 'totalSupply',
}

export enum ETokensContractType {
  ERC20 = 'ERC20',
  ERC223 = 'ERC223',
  ERC721 = 'ERC721',
  ERC777 = 'ERC777',
  ERC1155 = 'ERC1155',
}
