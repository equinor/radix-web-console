import { useEffect, useState } from 'react';

import useInterval from './use-interval';

import requestStates from '../state/state-utils/request-states';

const useAsyncPolling = (asyncRequest, path, pollInterval) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const poll = () => {
    setRefreshCount(refreshCount + 1);
  };
  useInterval(
    () => {
      poll();
    },
    pollInterval ? pollInterval : 15000
  );

  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useEffect(() => {
    setFetchState(prevState => {
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
      .then(result => {
        setFetchState({
          data: result,
          status: requestStates.SUCCESS,
        });
      })
      .catch(err => {
        setFetchState({
          error: err ? err.message : '',
          status: requestStates.FAILURE,
        });
      });
  }, [asyncRequest, setFetchState, path, pollInterval, refreshCount]);

  return [fetchState, poll];
};

export default useAsyncPolling;
