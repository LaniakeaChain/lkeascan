import fetch from 'isomorphic-unfetch';

import { API_URL } from 'data/data-fetch';
import { EFetchState, IFetchDataState } from 'models/models-async';
import { IUser } from 'models/models-auth';
import { IDictionary } from 'models/models-general';
import { isBrowser } from 'utils/browser';

import { Authentication } from './auth';

export async function fetchData(url: string, opts?: IDictionary<any>) {
  let auth;
  let authHeaders = {};
  let root = API_URL;

  if (isBrowser()) {
    auth = new Authentication();
    const user: IUser = await auth.getUser();

    if (user && user.access_token) {
      authHeaders = { Authorization: `Bearer ${user.access_token}` };
    }
  } else if (!root.startsWith('http')) {
    root = 'http://api:8081/api';
  }

  const defaultOpts = {
    headers: {
      ...authHeaders,
    },
  };

  let res;

  if (opts) {
    if (opts.headers) {
      opts.headers = { ...defaultOpts.headers, ...opts.headers };
    }

    res = await fetch(`${root}${url}`, { ...defaultOpts, ...opts });
  } else {
    res = await fetch(`${root}${url}`, defaultOpts);
  }

  if (res.status === 401 || res.status === 403) {
    if (auth) {
      auth.login();
    }
  }

  if (res.status >= 100 && res.status < 400) {
    const contentType = res.headers.get('content-type');

    if (contentType && contentType.indexOf('json') > -1) {
      const json = await res.json();

      if (json.error) {
        throw json.error;
      } else {
        return json;
      }
    } else {
      // the server did not respond with an error code, but no JSON was returned
      return null;
    }
  } else {
    throw new Error(`The server responded with an error code: ${res.status}.`);
  }
}

export function pauseIfUnset(path: string, param: string | string[]): string | null {
  return param === undefined || param === null ? null : `${path}${param}`;
}

export const success = (res, fetchingCallback) => {
  fetchingCallback({ data: res, fetchState: EFetchState.Success });
};

export const error = (res, fetchingCallback) => {
  fetchingCallback({ data: res, fetchState: EFetchState.Error });
};

export const INIT_ASYNC: IFetchDataState<any> = { fetchState: EFetchState.None };
