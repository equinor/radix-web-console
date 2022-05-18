import { useState } from 'react';

import { AsyncState } from './effect-types';
import {
  asyncRequestUtil,
  fallbackRequestConverter,
  fallbackResponseConverter,
} from './effect-utils';

import { fetchJsonNew } from '../api/api-helpers';
import { RequestState } from '../state/state-utils/request-states';

export type AsyncRequestResult<T, D> = [
  state: AsyncState<T>,
  request: (data: D) => void,
  resetState: () => void
];

/**
 * @param path API url
 * @param method request method [ GET, POST, etc. ]
 * @param requestConverter callback to process request data
 * @param responseConverter callback to process response data
 */
export function useAsyncRequest<T, D, R>(
  path: string,
  method: string,
  requestConverter: (requestData: D) => unknown = fallbackRequestConverter,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncRequestResult<T, D> {
  const [state, setState] = useState<AsyncState<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  const apiCall = (data: D) => {
    setState({ status: RequestState.IN_PROGRESS, data: null, error: null });
    asyncRequestUtil<T, string, R>(
      fetchJsonNew,
      setState,
      path,
      method,
      JSON.stringify(requestConverter(data)),
      responseConverter
    );
  };

  const resetState = () =>
    setState({ status: RequestState.IDLE, data: null, error: null });

  return [state, apiCall, resetState];
}
