import { useCallback, useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import {
  asyncRequestUtil,
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncLoadingResult<T> = [
  state: AsyncState<T>,
  resetState: () => void,
];

/**
 * @param asyncRequest request to perform
 * @param path resource url
 * @param payload payload to send with request
 * @param requestConverter callback for processing request data
 * @param responseConverter callback for processing response data
 */
export function useAsyncLoading<T, D, R>(
  asyncRequest: AsyncRequest<R, string>,
  path: string,
  payload?: D,
  requestConverter: (requestData: D) => unknown = fallbackRequestConverter,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncLoadingResult<T> {
  const data = JSON.stringify(requestConverter(payload));
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
      data,
      responseConverter,
      { signal }
    );

    return () => abortController.abort();
  }, [asyncRequest, path, data, responseConverter]);

  const resetState = useCallback(
    () => setState({ status: RequestState.IDLE, data: null, error: null }),
    []
  );

  return [state, resetState];
}
