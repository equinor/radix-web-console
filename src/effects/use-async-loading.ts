import { useEffect, useState } from 'react';

import { AsyncState } from './effect-types';
import {
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { RequestState } from '../state/state-utils/request-states';

type AsyncRequestType<T> = (
  path: string,
  method: string,
  data: string
) => Promise<T>;

export type AsyncLoadingResult<T> = [
  state: AsyncState<T>,
  resetState: () => void
];

/**
 * @param asyncRequest request to perform
 * @param path API url
 * @param method request method [ GET, POST, etc. ]
 * @param data data to send with request
 * @param requestConverter callback to process request data
 * @param responseConverter callback to process response data
 */
export function useAsyncLoading<T, D, R>(
  asyncRequest: AsyncRequestType<R>,
  path: string,
  method: string,
  data?: D,
  requestConverter: (requestData: D) => unknown = fallbackRequestConverter,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncLoadingResult<T> {
  const dataAsString = JSON.stringify(requestConverter(data));

  const [fetchState, setFetchState] = useState<AsyncState<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useEffect(() => {
    setFetchState({
      status: RequestState.IN_PROGRESS,
      data: null,
      error: null,
    });
    asyncRequest(path, method, dataAsString)
      .then((result) => {
        setFetchState({
          status: RequestState.SUCCESS,
          data: responseConverter(result),
        });
      })
      .catch((err: Error) => {
        setFetchState({
          status: RequestState.FAILURE,
          data: null,
          error: err?.message || '',
        });
      });
  }, [asyncRequest, responseConverter, path, method, dataAsString]);

  const resetState = () =>
    setFetchState({
      status: RequestState.IDLE,
      data: null,
      error: null,
    });

  return [fetchState, resetState];
}
