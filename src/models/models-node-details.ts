interface INodeDetailsPeer {
  id: string;
  name: string;
  address: string;
}

export interface INodeDetailsFetch {
  id: string;
  name: string;
  enode: string;
  address: string;
  peerCount: number;
  peers: INodeDetailsPeer[];
}
