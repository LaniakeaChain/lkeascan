import { ILinkItem } from './models-general';

export interface IContractDetailsFetch {
  address: string;
  balance: number;
  ethBalance: string;
  contractAddress: string;
  contractCreator: string;
  contractType: string;
  createdBlockHash: string;
  createdBlockNumber: number;
  createdTimstampISO: string;
  createdTransactionHash: string;
  private: boolean;
  swarmHash: string;
  transactionCount: number;
  metadataName?: string;
  links: ILinkItem[];
  display?: string;
}

export interface IBytecodes {
  deployedCode: string;
  creationData: string;
}
