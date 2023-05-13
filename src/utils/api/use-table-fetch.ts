import { NextRouter, useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import useSWR from 'swr';

import { IError, IFetchConfig, IFetchParamsValues } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { autoRefreshTableMs } from 'utils/variable-evaluation';

import { fetchData } from './queries';
import { filterToCurrentSelectedOptions, generateLink, serialize } from './queries-format';

export function getLink({
  params,
  pathname,
}: {
  pathname: string;
  params: { [key: string]: string | string[] };
}) {
  return generateLink(pathname, params);
}

function redirect(
  nextFilterParams: Partial<IFetchParamsValues>,
  currentFilterParams: Partial<IFetchParamsValues>,
  router: NextRouter,
  fetchConfig: IFetchConfig,
) {
  const { params, pathname } = fetchConfig;

  const { as, href } = generateLink(pathname, {
    ...params,
    ...currentFilterParams,
    ...(nextFilterParams as any),
  });

  router.push(href, as);
}

const useStickyResult = <T>(value: T | undefined): T | undefined => {
  const val = useRef<T | undefined>();
  if (value !== undefined) val.current = value;
  return val.current;
};

const useTableFetch = <T>(
  fetchConfig: IFetchConfig,
): [
  {
    error: IError | undefined;
    data: T | undefined;
    loading: boolean;
    currentFilters: IDictionary<string[]>;
    filterParams: IFetchParamsValues;
  },
  (nextFilterParams: Partial<IFetchParamsValues>) => void,
] => {
  const router = useRouter();

  const filterParams = router.query as any;

  const currentFilters = filterToCurrentSelectedOptions(
    Array.isArray(router.query.filter) ? router.query.filter[0] : router.query.filter,
  );

  const { apiLink, params } = fetchConfig;

  const {
    as: { pathname, query },
  } = generateLink(apiLink, { ...params, ...filterParams });

  const serializedQuery = serialize(query);
  const fetchUrl = serializedQuery ? `${pathname}?${serializedQuery}` : pathname;

  const { data, error } = useSWR<T, IError>(fetchUrl, fetchData, {
    refreshInterval: autoRefreshTableMs,
  });

  const stickyData = useStickyResult(data);
  const stickyError = useStickyResult(error);

  const handleChangeFilterParams = useCallback(
    (nextFilterParams: Partial<IFetchParamsValues>) => {
      redirect(nextFilterParams, filterParams, router, fetchConfig);
    },
    [fetchConfig, filterParams, router],
  );

  return [
    {
      data: stickyData,
      error: stickyError,
      loading: !data && !error,
      filterParams,
      currentFilters,
    },
    handleChangeFilterParams,
  ];
};

export default useTableFetch;
