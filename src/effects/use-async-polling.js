import { useEffect, useState, useCallback } from 'react';

import useInterval from './use-interval';

import requestStates from '../state/state-utils/request-states';

const poll = (asyncRequest, setFetchState, path) => {
  setFetchState((prevState) => {
    return {
      data: prevState.data,
      error: null,
      status:
        prevState.status === requestStates.SUCCESS
          ? requestStates.SUCCESS
          : requestStates.IN_PROGRESS,
    };
  });
  asyncRequest(path, 'GET')
    .then((result) => {
      setFetchState({
        data: result,
        status: requestStates.SUCCESS,
      });
    })
    .catch((err) => {
      setFetchState({
        error: err ? err.message : '',
        status: requestStates.FAILURE,
      });
    });
};

const useAsyncPolling = (asyncRequest, path, pollInterval) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useInterval(
    () => {
      setRefreshCount((prevValue) => prevValue + 1);
    },
    pollInterval ? pollInterval : 15000
  );

  const pollCallback = useCallback(
    () => poll(asyncRequest, setFetchState, path),
    [asyncRequest, setFetchState, path]
  );

  useEffect(() => {
    pollCallback();
  }, [pollCallback, pollInterval, refreshCount]);

  return [fetchState, pollCallback];
};

export default useAsyncPolling;
