'use strict';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { hexValue, hexlify } from '@ethersproject/bytes';
import { Network, Networkish } from '@ethersproject/networks';
import { deepCopy, defineReadOnly } from '@ethersproject/properties';
import { BaseProvider } from '@ethersproject/providers';
import { accessListify } from '@ethersproject/transactions';
import { ConnectionInfo, fetchJson } from '@ethersproject/web';

import { API_URL } from 'data/data-fetch';

// The transaction has already been sanitized by the calls in Provider
function getTransactionPostData(transaction: TransactionRequest): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in transaction) {
    if ((<any>transaction)[key] === null) {
      continue;
    }

    let value = (<any>transaction)[key];

    if (key === 'type' && value === 0) {
      continue;
    }

    // Quantity-types require no leading zero, unless 0
    if (
      (<any>{
        type: true,
        gasLimit: true,
        gasPrice: true,
        maxFeePerGs: true,
        maxPriorityFeePerGas: true,
        nonce: true,
        value: true,
      })[key]
    ) {
      value = hexValue(hexlify(value));
    } else if (key === 'accessList') {
      value =
        '[' +
        accessListify(value)
          .map((set) => `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`)
          .join(',') +
        ']';
    } else {
      value = hexlify(value);
    }

    result[key] = value;
  }

  return result;
}

function getJsonResult(result: {
  jsonrpc: string;
  result?: any;
  error?: { code?: number; data?: any; message?: string };
}): any {
  if (result.jsonrpc !== '2.0') {
    const error: any = new Error('invalid response');
    error.result = JSON.stringify(result);
    throw error;
  }

  if (result.error) {
    const error: any = new Error(result.error.message || 'unknown error');

    if (result.error.code) {
      error.code = result.error.code;
    }

    if (result.error.data) {
      error.data = result.error.data;
    }

    throw error;
  }

  return result.result;
}

export class EpirusProvider extends BaseProvider {
  readonly baseUrl: string;

  constructor(network?: Networkish) {
    super(network);

    defineReadOnly(this, 'baseUrl', this.getBaseUrl());
  }

  getBaseUrl(): string {
    return API_URL;
  }

  getUrl(params: Record<string, string>): string {
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    return `${this.baseUrl}/proxy/?${query}`;
  }

  getPostUrl(): string {
    return `${this.baseUrl}/proxy/`;
  }

  getPostData(params: Record<string, any>): Record<string, any> {
    return params;
  }

  async fetch(params: Record<string, any>, post?: boolean): Promise<any> {
    const url = post ? this.getPostUrl() : this.getUrl(params);
    const payload = post ? params : null;

    this.emit('debug', {
      action: 'request',
      request: url,
      provider: this,
    });

    const connection: ConnectionInfo = {
      url: url,
      throttleSlotInterval: 1000,
      throttleCallback: (/*attempt: number, url: string*/) => Promise.resolve(true),
    };

    let payloadStr: string = null;

    if (payload) {
      connection.headers = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };

      payloadStr = Object.keys(payload)
        .map((key) => `${key}=${payload[key]}`)
        .join('&');
    }

    const result = await fetchJson(connection, payloadStr, getJsonResult);

    this.emit('debug', {
      action: 'response',
      request: url,
      response: deepCopy(result),
      provider: this,
    });

    return result;
  }

  async detectNetwork(): Promise<Network> {
    return Promise.resolve(this.network);
  }

  async perform(method: string, params: any): Promise<any> {
    switch (method) {
      case 'call': {
        if (params.blockTag !== 'latest') {
          throw new Error('EpirusProvider does not support blockTag for call');
        }

        const postData = getTransactionPostData(params.transaction);

        try {
          return await this.fetch(postData, true);
        } catch (error) {
          return error;
        }
      }

      default:
        break;
    }

    throw new Error('Only call methods are supported.');
  }
}
