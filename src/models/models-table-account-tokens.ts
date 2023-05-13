import { IPaging } from './models-data-general';
import { ITokensData } from './models-table-tokens';

export enum EAccountTokensHeaderType {
  TokenAddress = 'TokenAddress',
  Quantity = 'Quantity',
}

interface IAccountBalance {
  tokenAddress: string;
  tokenType: string;
  amount: string;
  count: string;
  symbol?: string;
  name?: string;
  quantity: number;
  tokenIds?: string[];
  lastUpdated: number;
}

interface IAccountBalanceData {
  balances: IAccountBalance[];
}

export interface IAccountBalanceTableFetch {
  paging: IPaging;
  data: IAccountBalanceData[];
  metadata: {
    tokens: ITokensData[];
  };
}

export enum EAccountTokensSortAndFilterType {
  lastExecuted = 'lastExecuted',
  amount = 'amount',
  tokenType = 'tokenType',
}
