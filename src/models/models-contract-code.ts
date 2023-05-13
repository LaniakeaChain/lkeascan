type NamedSource = {
  text: string;
  name: string;
  label?: string;
};

export interface IContractSources {
  sources: NamedSource[];
  metadata: any;
}
