import { useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import {
  asyncRequestUtil,
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncLoadingResult<T> = [
  state: AsyncState<T>,
  resetState: () => void
];

/**
 * @param asyncRequest request to perform
 * @param path resource url
 * @param data data to send with request
 * @param requestConverter callback for processing request data
 * @param responseConverter callback for processing response data
 */
export function useAsyncLoading<T, D, R>(
  asyncRequest: AsyncRequest<R, string>,
  path: string,
  data?: D,
  requestConverter: (requestData: D) => unknown = fallbackRequestConverter,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncLoadingResult<T> {
  const dataAsString = JSON.stringify(requestConverter(data));
  const [state, setState] = useState<AsyncState<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const { signal } = abortController;
    setState({ status: RequestState.IN_PROGRESS, data: null, error: null });
    asyncRequestUtil<T, string, R>(
      asyncRequest,
      (x) => !signal.aborted && setState(x),
      path,
      dataAsString,
      responseConverter,
      { signal }
    );

    return () => abortController.abort();
  }, [asyncRequest, dataAsString, path, responseConverter]);

  const resetState = () =>
    setState({ status: RequestState.IDLE, data: null, error: null });

  return [state, resetState];
}
