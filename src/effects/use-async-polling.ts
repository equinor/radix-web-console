import { useCallback, useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import { asyncRequestUtil, fallbackResponseConverter } from './effect-utils';
import { useInterval } from './use-interval';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncPollingResult<T> = [state: AsyncState<T>, poll: () => void];

/**
 * @param asyncRequest request to perform
 * @param path resource url
 * @param pollInterval poll interval in ms
 * @param responseConverter callback for processing response data
 */
export function useAsyncPolling<TResult, TResponse>(
  asyncRequest: AsyncRequest<TResponse, string>,
  path: string,
  pollInterval: number,
  responseConverter: (data: TResponse) => TResult = fallbackResponseConverter
): AsyncPollingResult<TResult> {
  const [abortController] = useState(new AbortController());
  const [refreshCount, setRefreshCount] = useState(0);
  const [state, setState] = useState<AsyncState<TResult>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useInterval(() => {
    if (pollInterval > 0) {
      setRefreshCount((prev) => prev + 1);
    }
  }, pollInterval || 15000);

  const pollCallback = useCallback(() => {
    const { signal } = abortController;
    setState((prevState) => ({
      status:
        prevState.status === RequestState.SUCCESS
          ? RequestState.SUCCESS
          : RequestState.IN_PROGRESS,
      data: prevState.data,
      error: null,
    }));
    asyncRequestUtil<TResult, undefined, TResponse>(
      asyncRequest,
      (x) => !signal.aborted && setState(x),
      path,
      null,
      responseConverter,
      { signal }
    );
  }, [abortController, asyncRequest, path, responseConverter]);

  useEffect(() => {
    if (pollInterval > 0) {
      pollCallback();
    }
  }, [pollCallback, pollInterval, refreshCount]);

  useEffect(() => () => abortController.abort(), [abortController]);
  return [state, pollCallback];
}
