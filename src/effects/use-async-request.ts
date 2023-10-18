import { useCallback, useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import {
  asyncRequestUtil,
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncRequestResult<T, D> = [
  state: AsyncState<T>,
  request: (data: D) => void,
  resetState: () => void,
];

/**
 * @param asyncRequest request to perform
 * @param path resource url
 * @param requestConverter callback for processing request data
 * @param responseConverter callback for processing response data
 */
export function useAsyncRequest<T, D, R>(
  asyncRequest: AsyncRequest<R, string>,
  path: string,
  requestConverter: (requestData: D) => unknown = fallbackRequestConverter,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncRequestResult<T, D> {
  const [abortController] = useState(new AbortController());
  const [state, setState] = useState<AsyncState<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  const apiCall = (payload: D) => {
    const { signal } = abortController;
    setState({ status: RequestState.IN_PROGRESS, data: null, error: null });
    asyncRequestUtil<T, string, R>(
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
