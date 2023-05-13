import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';
import { ETagType } from './models-tags';

export enum EContractsHeaderType {
  Type = 'Type',
  Name = 'Name',
  Hash = 'Address',
  'Transaction Count' = 'Transaction Count',
  'Creation Date' = 'Creation Date',
  'Last Execution' = 'Last Execution',
}

export interface IContractsData {
  address: string;
  contractType: ETagType;
  createdTimestampISO: string;
  createdTransaction: string;
  lastExecutedTimestampISO: string;
  lastExecutedTransaction: string;
  transactionCount: number;
  metadataName?: string;
  display?: string;
  links?: ILinkItem[];
}

export interface IContractsTableFetch {
  paging: IPaging;
  data: IContractsData[];
}

export enum EContractsSortAndFilterType {
  created = 'created', // "created.blockNumber" - default
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
  contractCreator = 'contractCreator',
}

export enum EContractsContractType {
  Custom = 'Custom',
  ERC20 = 'ERC20',
  ERC223 = 'ERC223',
  ERC721 = 'ERC721',
  ERC777 = 'ERC777',
  ERC1155 = 'ERC1155',
}
