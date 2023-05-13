import { ILinkItem } from 'models/models-general';

export interface IAccountDetailsFetch {
  address: string;
  balance: number;
  ethBalance: string;
  transactions: number;
  display?: string;
  links: ILinkItem[];
}
