import { IPaging } from './models-data-general';

export enum ENodePeersHeaderType {
  ID = 'ID',
  Name = 'Name',
  Address = 'Address',
}

export interface IPeerData {
  id: string;
  name: string;
  address: string;
}

export interface IPeersTableFetch {
  paging: IPaging;
  data: IPeerData[];
}
