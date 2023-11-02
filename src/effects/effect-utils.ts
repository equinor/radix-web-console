import { Dispatch, SetStateAction } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';

import { RadixRequestInit } from '../api/api-helpers';
import { RequestState } from '../state/state-utils/request-states';
import { NetworkException } from '../utils/exception';

/**
 * @param asyncRequestCb asynchronous request method
 * @param setStateCb callback to set response data
 * @param path resource url
 * @param payload data to send with request
 * @param responseConverter callback for processing response data
 */
export function asyncRequestUtil<TResult, TPayload, TResponse>(
  asyncRequestCb: AsyncRequest<TResponse, TPayload>,
  setStateCb: Dispatch<SetStateAction<AsyncState<TResult>>>,
  path: string,
  payload: TPayload,
  responseConverter: (data: TResponse) => TResult,
  options?: RadixRequestInit
): void {
  asyncRequestCb(path, options, payload)
    .then((result) =>
      setStateCb({
        status: RequestState.SUCCESS,
        data: responseConverter(result),
      })
    )
    .catch((err: Error) =>
      setStateCb({
        status: RequestState.FAILURE,
        data: null,
        error: err?.message || '',
        code: (err as NetworkException)?.status,
      })
    );
}

export function fallbackRequestConverter<R>(data: R): unknown {
  return data;
}

export function fallbackResponseConverter<T>(data: unknown): T {
  return data as T;
}
