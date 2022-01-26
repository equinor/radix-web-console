import { useState } from 'react';

import { fetchJsonNew } from '../api/api-helpers';
import { RequestState } from '../state/state-utils/request-states';

export type AsyncRequestStatus<T> = {
  status: RequestState;
  data: T;
  error?: string;
};

/**
 * @param path url to API
 * @param method request method [ GET, POST, etc. ]
 * @param processRequestData callback to process request data
 * @param processResponseData callback to process response data into type T
 */
export function useAsyncRequest<T, D, R>(
  path: string,
  method: string,
  processRequestData: (data: D) => any = (data) => data,
  processResponseData: (result: R) => T = (result: unknown) => result as T
): [
  state: AsyncRequestStatus<T>,
  request: (data: D) => void,
  resetState: () => void
] {
  const [fetchState, setFetchState] = useState<AsyncRequestStatus<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  const apiCall = (data: D) => {
    const dataAsString = JSON.stringify(processRequestData(data));
    setFetchState({
      status: RequestState.IN_PROGRESS,
      data: null,
      error: null,
    });
    fetchJsonNew(path, method, dataAsString)
      .then((result: R) => {
        setFetchState({
          status: RequestState.SUCCESS,
          data: processResponseData(result),
        });
      })
      .catch((err: Error) => {
        setFetchState({
          status: RequestState.FAILURE,
          data: null,
          error: err?.message || '',
        });
      });
  };

  const resetState = () =>
    setFetchState({
      status: RequestState.IDLE,
      data: null,
      error: null,
    });

  return [fetchState, apiCall, resetState];
}
