import { Dispatch, SetStateAction } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';

import { RequestState } from '../state/state-utils/request-states';

/**
 * @param asyncRequestCb asynchronous request method
 * @param setStateCb callback to set response data
 * @param path API url
 * @param requestData data to send with request
 * @param responseConverter method to process response data
 */
export function asyncRequestUtil<T, D, R>(
  asyncRequestCb: AsyncRequest<R, D>,
  setStateCb: Dispatch<SetStateAction<AsyncState<T>>>,
  path: string,
  requestData: D,
  responseConverter: (responseData: R) => T
): void {
  asyncRequestCb(path, requestData)
    .then((result) => {
      setStateCb({
        status: RequestState.SUCCESS,
        data: responseConverter(result),
      });
    })
    .catch((err: Error) => {
      setStateCb({
        status: RequestState.FAILURE,
        data: null,
        error: err?.message || '',
      });
    });
}

export function fallbackRequestConverter<R>(requestData: R): unknown {
  return requestData;
}

export function fallbackResponseConverter<T>(responseData: unknown): T {
  return responseData as T;
}
