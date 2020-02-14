import { useEffect, useState } from 'react';

import requestStates from '../state/state-utils/request-states';

const useAsyncLoading = (asyncRequest, path, method, data) => {
  const dataAsString = JSON.stringify(data);

  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useEffect(() => {
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });
    asyncRequest(path, method, dataAsString)
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
  }, [asyncRequest, setFetchState, path, method, dataAsString]);

  const resetState = () =>
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IDLE,
    });

  return [fetchState, resetState];
};

export default useAsyncLoading;
