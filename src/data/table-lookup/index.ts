import { IHeaderDictionary } from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';

import { ACCOUNT_NFT_COLLECTION_CELL_LOOKUP } from './data-account-nft-collection';
import { ACCOUNT_NFT_MOBILE_COLLECTION_CELL_LOOKUP } from './data-account-nft-collection-mobile';
import { ACCOUNT_TOKENS_CELL_LOOKUP } from './data-account-token-balances';
import { ACCOUNT_TOKENS_MOBILE_CELL_LOOKUP } from './data-account-token-balances-mobile';
import { BLOCKS_CELL_LOOKUP } from './data-blocks';
import { BLOCKS_MOBILE_CELL_LOOKUP } from './data-blocks-mobile';
import { CONTRACTS_CELL_LOOKUP } from './data-contracts';
import { CONTRACTS_MOBILE_CELL_LOOKUP } from './data-contracts-mobile';
import { EVENTS_CELL_LOOKUP } from './data-events';
import { EVENTS_CONTRACTS_CELL_LOOKUP } from './data-events-contracts';
import { EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP } from './data-events-contracts-mobile';
import { EVENTS_MOBILE_CELL_LOOKUP } from './data-events-mobile';
import { EVENTS_TRANSACTIONS_CELL_LOOKUP } from './data-events-transactions';
import { EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-events-transactions-mobile';
import { FUNCTION_TRANSACTIONS_CELL_LOOKUP } from './data-function-transactions';
import { FUNCTION_TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-function-transactions-mobile';
import { HOLDERS_CELL_LOOKUP } from './data-holders';
import { HOLDERS_MOBILE_CELL_LOOKUP } from './data-holders.mobile';
import { METADATA_CELL_LOOKUP } from './data-metadata';
import { METADATA_MOBILE_CELL_LOOKUP } from './data-metadata-mobile';
import { NODE_PEERS_CELL_LOOKUP } from './data-node-peers';
import { NODE_PEERS_MOBILE_CELL_LOOKUP } from './data-node-peers-mobile';
import { TOKENS_CELL_LOOKUP } from './data-tokens';
import { TOKENS_MOBILE_CELL_LOOKUP } from './data-tokens-mobile';
import { INTERNAL_TRANSACTIONS_CELL_LOOKUP, TRANSACTIONS_CELL_LOOKUP } from './data-transactions';
import {
  INTERNAL_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  TRANSACTIONS_MOBILE_CELL_LOOKUP,
} from './data-transactions-mobile';
import { TRANSFERS_CELL_LOOKUP } from './data-transfers';
import { TRANSFERS_MOBILE_CELL_LOOKUP } from './data-transfers-mobile';

export const COMBINED_LOOKUP: IDictionary<IHeaderDictionary<(data: any) => JSX.Element>> = {
  [EPageType.accountTokens]: ACCOUNT_TOKENS_CELL_LOOKUP,
  [EPageType.accountTokensMobile]: ACCOUNT_TOKENS_MOBILE_CELL_LOOKUP,
  [EPageType.metadata]: METADATA_CELL_LOOKUP,
  [EPageType.metadataMobile]: METADATA_MOBILE_CELL_LOOKUP,
  [EPageType.contracts]: CONTRACTS_CELL_LOOKUP,
  [EPageType.contractsMobile]: CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.contractsMostActive]: CONTRACTS_CELL_LOOKUP,
  [EPageType.contractsMobileMostActive]: CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.events]: EVENTS_CELL_LOOKUP,
  [EPageType.eventsMobile]: EVENTS_MOBILE_CELL_LOOKUP,
  [EPageType.tokens]: TOKENS_CELL_LOOKUP,
  [EPageType.tokensMobile]: TOKENS_MOBILE_CELL_LOOKUP,
  [EPageType.transactions]: TRANSACTIONS_CELL_LOOKUP,
  [EPageType.transactionsMobile]: TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.internalTransactions]: INTERNAL_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.internalTransactionsMobile]: INTERNAL_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.transfers]: TRANSFERS_CELL_LOOKUP,
  [EPageType.transfersMobile]: TRANSFERS_MOBILE_CELL_LOOKUP,
  [EPageType.blocks]: BLOCKS_CELL_LOOKUP,
  [EPageType.blocksMobile]: BLOCKS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsContracts]: EVENTS_CONTRACTS_CELL_LOOKUP,
  [EPageType.eventsContractsMobile]: EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsTransactions]: EVENTS_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.eventsTransactionsMobile]: EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.functionTransactions]: FUNCTION_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.functionTransactionsMobile]: FUNCTION_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.nodePeers]: NODE_PEERS_CELL_LOOKUP,
  [EPageType.nodePeersMobile]: NODE_PEERS_MOBILE_CELL_LOOKUP,
  [EPageType.holders]: HOLDERS_CELL_LOOKUP,
  [EPageType.holdersMobile]: HOLDERS_MOBILE_CELL_LOOKUP,
  [EPageType.accountNftCollections]: ACCOUNT_NFT_COLLECTION_CELL_LOOKUP,
  [EPageType.accountNftCollectionsMobile]: ACCOUNT_NFT_MOBILE_COLLECTION_CELL_LOOKUP,
};

export const TYPE_LOOKUP = {
  // always end with "s", will be removed if only one element
  metadata: 'results',
  metadataMobile: 'results',
  contracts: 'contracts',
  contractsMobile: 'contracts',
  contractsMostActive: 'contractsMostActive',
  contractsMobileMostActive: 'contractsMobileMostActive',
  tokens: 'tokens',
  tokensMobile: 'tokens',
  events: 'events',
  eventsMobile: 'events',
  transactions: 'transactions',
  transactionsMobile: 'transactions',
  internalTransactions: 'internal transactions',
  internalTransactionsMobile: 'internal transactions',
  transfers: 'transfers',
  transfersMobile: 'transfers',
  blocks: 'blocks',
  blocksMobile: 'blocks',
  eventsContracts: 'events',
  eventsContractsMobile: 'events',
  eventsTransactions: 'events',
  eventsTransactionsMobile: 'events',
  functionTransactions: 'functions',
  functionTransactionsMobile: 'functions',
  nodePeers: 'peers',
  nodePeersMobile: 'peers',
  holders: 'holders',
  holdersMobile: 'holders',
  accountTokens: 'tokens',
  accountTokensMobile: 'tokens',
  accountNftCollections: 'NFT Items',
  accountNftCollectionsMobile: 'NFT Items',
};
