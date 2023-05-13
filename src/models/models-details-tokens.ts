import { ILinkItem } from './models-general';
import { ETagType } from './models-tags';

export interface ITokenDetailsFetch {
  address: string;
  contractType: ETagType;
  decimals: number;
  lastExecutedTimestampISO: string;
  name?: string;
  symbol?: string;
  totalSupply?: number;
  transactionCount: number;
  addressLinks: ILinkItem[];
}
