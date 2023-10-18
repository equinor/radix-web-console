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
export function useAsyncLoading<TResult, TPayload, TResponse>(
  asyncRequest: AsyncRequest<TResponse, string>,
  path: string,
  payload?: TPayload,
  requestConverter: (data: TPayload) => unknown = fallbackRequestConverter,
  responseConverter: (data: TResponse) => TResult = fallbackResponseConverter
): AsyncLoadingResult<TResult> {
  const data = JSON.stringify(requestConverter(payload));
  const [state, setState] = useState<AsyncState<TResult>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const { signal } = abortController;
    setState({ status: RequestState.IN_PROGRESS, data: null, error: null });
    asyncRequestUtil<TResult, string, TResponse>(
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
