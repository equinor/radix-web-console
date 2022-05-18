import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { AsyncState } from './effect-types';
import { fallbackResponseConverter } from './effect-utils';
import { useInterval } from './use-interval';

import { RequestState } from '../state/state-utils/request-states';

type AsyncRequestType<D, R> = (
  path: string,
  method?: string,
  data?: D
) => Promise<R>;

export type AsyncPollingResult<T> = [state: AsyncState<T>, poll: () => void];

function poll<T, D, R>(
  asyncRequest: AsyncRequestType<D, R>,
  setFetchState: Dispatch<SetStateAction<AsyncState<T>>>,
  path: string,
  responseConverter: (responseData: R) => T
): void {
  setFetchState((prevState) => ({
    status:
      prevState.status === RequestState.SUCCESS
        ? RequestState.SUCCESS
        : RequestState.IN_PROGRESS,
    data: prevState.data,
    error: null,
  }));
  asyncRequest(path, 'GET')
    .then((result) => {
      setFetchState({
        status: RequestState.SUCCESS,
        data: responseConverter(result),
      });
    })
    .catch((err: Error) => {
      setFetchState({
        status: RequestState.FAILURE,
        data: null,
        error: err?.message || '',
      });
    });
}

/**
 * @param asyncRequest request to perform
 * @param path API url
 * @param pollInterval poll interval in ms
 */
export function useAsyncPolling<T, D, R>(
  asyncRequest: AsyncRequestType<D, R>,
  path: string,
  pollInterval: number,
  responseConverter: (responseData: R) => T = fallbackResponseConverter
): AsyncPollingResult<T> {
  const [refreshCount, setRefreshCount] = useState(0);
  const [fetchState, setFetchState] = useState<AsyncState<T>>({
    status: RequestState.IDLE,
    data: null,
    error: null,
  });

  useInterval(() => {
    if (pollInterval > 0) {
      setRefreshCount((prev) => prev + 1);
    }
  }, pollInterval || 15000);

  const pollCallback = useCallback<() => void>(
    () => poll(asyncRequest, setFetchState, path, responseConverter),
    [asyncRequest, setFetchState, path, responseConverter]
  );

  useEffect(() => {
    pollCallback();
  }, [pollCallback, pollInterval, refreshCount]);

  return [fetchState, pollCallback];
}
