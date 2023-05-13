import { IPaging } from './models-data-general';
import { IBasicParameter } from './models-general';

export enum EFunctionHeaderType {
  Name = 'Name',
  Parameters = 'Parameters',
}

export interface IFunctionMetaParameter extends IBasicParameter {
  transactionHash: string;
  direction: string;
}

export interface IFunctionMeta {
  functionName: string;
  functionType: string;
  stateMutability: string;
  params: IFunctionMetaParameter[];
}

export interface IFunctionData {
  functionName: string;
  parameters: IFunctionMetaParameter[];
}

export interface IFunctionTableFetch {
  data: IFunctionData[];
  paging?: IPaging;
}
