import { useCallback, useEffect, useState } from 'react';

import { AsyncRequest, AsyncState } from './effect-types';
import { asyncRequestUtil, fallbackResponseConverter } from './effect-utils';
import { useInterval } from './use-interval';

import { RequestState } from '../state/state-utils/request-states';

export type AsyncPollingResult<T> = [state: AsyncState<T>, poll: () => void];

/**
 * @param asyncRequest request to perform
 * @param path API url
 * @param pollInterval poll interval in ms
 * @param responseConverter callback to process response data
 */
export function useAsyncPolling<T, R>(
  asyncRequest: AsyncRequest<R, string>,
  path: string,
  pollInterval: number,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncPollingResult<T> {
  const [refreshCount, setRefreshCount] = useState(0);
  const [state, setState] = useState<AsyncState<T>>({
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
    setState((prevState) => ({
      status:
        prevState.status === RequestState.SUCCESS
          ? RequestState.SUCCESS
          : RequestState.IN_PROGRESS,
      data: prevState.data,
      error: null,
    }));
    asyncRequestUtil<T, undefined, R>(
      asyncRequest,
      setState,
      path,
      null,
      responseConverter
    );
  }, [asyncRequest, setState, path, responseConverter]);

  useEffect(() => {
    pollCallback();
  }, [pollCallback, pollInterval, refreshCount]);

  return [state, pollCallback];
}
