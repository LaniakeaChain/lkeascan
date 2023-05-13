import { EFetchState, IFetchDataState } from 'models/models-async';

import { error, fetchData, success } from './queries';

export async function handleAddMapping(
  id: string,
  labelText: string,
  fetchingCallback: (fetchState: IFetchDataState<string>) => void,
) {
  fetchingCallback({ data: labelText, fetchState: EFetchState.Fetching });

  await fetchData(`/mappings/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      label: labelText,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => success(labelText, fetchingCallback)) // res is null
    .catch((res) => error(res, fetchingCallback));
}

export async function handleDeleteMapping(
  id: string,
  fetchingCallback: (fetchState: IFetchDataState<string>) => void,
) {
  fetchingCallback({ fetchState: EFetchState.Fetching });

  await fetchData(`/mappings/${id}`, {
    method: 'DELETE',
  })
    .then((res) => success(res, fetchingCallback))
    .catch((res) => error(res, fetchingCallback));
}
