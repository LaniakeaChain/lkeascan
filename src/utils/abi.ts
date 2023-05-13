export function isArrayParam(paramType) {
  return paramType.endsWith('[]');
}

export function functionSignature({ inputs, name }: RawAbiDefinition) {
  return `${name}(${inputs.map((i) => i.type).join(',')})`;
}

export function functionFullSignature({ inputs, name, outputs }: RawAbiDefinition) {
  return (
    `${name}(${inputs.map((i) => (i.anonymous ? '' : `${i.name}: `) + `${i.type}`).join(', ')})` +
    (outputs.length > 0 ? ` : ${outputs.map((o) => o.type).join(', ')}` : ' : void')
  );
}

export type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable';

export interface RawAbiParameter {
  name: string;
  type: string;
  internalType?: string;
  components?: RawAbiParameter[];
  anonymous?: boolean;
}

export type RawAbi = Array<RawAbiDefinition | RawEventAbiDefinition>;

export interface RawAbiDefinition {
  name: string;
  constant: boolean;
  payable: boolean;
  stateMutability?: StateMutability; // for older ABIs this will be undefined
  inputs: RawAbiParameter[];
  outputs: RawAbiParameter[];
  type: string;
}

interface RawEventAbiDefinition {
  type: 'event';
  anonymous?: boolean;
  name: string;
  inputs: RawEventArgAbiDefinition[];
}

interface RawEventArgAbiDefinition {
  indexed: boolean;
  name: string;
  type: string;
}
