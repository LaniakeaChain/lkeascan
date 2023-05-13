import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';

export enum EMetadataHeaderType {
  Name = 'Name',
  ContractsCount = 'Contracts Count',
}

export interface IMetadataData {
  contractCount?: number;
  links: ILinkItem[];
  metadata?: string; //stringified json
  name: string;
  fileId?: string;
}

export interface IMetadataTableFetch {
  paging: IPaging;
  data: IMetadataData[];
}

export enum EMetadataSortAndFilterType {
  created = 'created', // "created.blockNumber" - default
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
  contractCreator = 'contractCreator',
}

export interface IMetadataOption {
  name: string;
  component: JSX.Element;
}
