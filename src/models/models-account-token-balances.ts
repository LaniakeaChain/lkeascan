import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';
import { ETokensContractType } from './models-table-tokens';

export enum TAccountBalancesHeaderType {
  Symbol = 'Symbol',
  Amount = 'Amount',
  TokenAddress = 'Token Address',
  TokenType = 'Contract Type',
  Count = 'Count',
  Quantity = 'Quantity',
}

interface ITokens {
  address: string;
  addressLinks: ILinkItem[];
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  contractType: ETokensContractType;
  transactionCount: number;
  lastExecutedTimestampISO: string;
  holdersCount: number;
}

export interface ITokenBalances {
  tokenAddress: string;
  tokenType: ETokensContractType;
  amount: string;
  count: number;
  name?: string;
  symbol?: string;
  quantity: number;
  lastUpdated: number;
}

interface ITokenBalancesData {
  holdersAddress: string;
  holdersAddressLinks: ILinkItem;
  balances: ITokenBalances[];
}

export interface ITokenBalancesTableFetch {
  paging: IPaging;
  data: ITokenBalancesData[];
  metadata: ITokenBalancesMetadata;
}

interface ITokenBalancesMetadata {
  tokens: ITokens[];
}

export enum TAccountBalancesSortAndFilterType {
  quantity = 'quantity',
  contractType = 'contractType',
}

export interface CustomTokenBalanceData {
  paging: IPaging;
  data: ITokenBalances[];
  metadata: ITokenBalancesMetadata;
}
