import { useCallback, useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import {
  asyncRequestUtil,
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncRequestResult<T, P> = [
  state: AsyncState<T>,
  request: (payload: P) => void,
  resetState: () => void,
];

/**
 * @param asyncRequest request to perform
 * @param path resource url
 * @param requestConverter callback for processing request data
 * @param responseConverter callback for processing response data
 */
export function useAsyncRequest<TResult, TPayload, TResponse>(
  asyncRequest: AsyncRequest<TResponse, string>,
  path: string,
  requestConverter: (data: TPayload) => unknown = fallbackRequestConverter,
  responseConverter: (data: TResponse) => TResult = fallbackResponseConverter
): AsyncRequestResult<TResult, TPayload> {
  const [abortController] = useState(new AbortController());
  const [state, setState] = useState<AsyncState<TResult>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  const apiCall = (payload: TPayload) => {
    const { signal } = abortController;
    setState({ status: RequestState.IN_PROGRESS, data: null, error: null });
    asyncRequestUtil<TResult, string, TResponse>(
      asyncRequest,
      (x) => !signal.aborted && setState(x),
      path,
      JSON.stringify(requestConverter(payload)),
      responseConverter,
      { signal }
    );
  };

  const resetState = useCallback(
    () => setState({ status: RequestState.IDLE, data: null, error: null }),
    []
  );

  useEffect(() => () => abortController.abort(), [abortController]);
  return [state, apiCall, resetState];
}
