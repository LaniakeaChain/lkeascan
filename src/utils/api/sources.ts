import { API_URL } from 'data/data-fetch';
import { IBytecodes } from 'models/models-details-contracts';

export async function fetchBytecodes(contractAddress: string) {
  const bytecodeRs = await fetch(`${API_URL}/contracts/${contractAddress}/bytecode`);
  return (await bytecodeRs.json()) as IBytecodes;
}
