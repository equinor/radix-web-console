import { useEffect, useState } from 'react';

import requestStates from '../state/state-utils/request-states';

const useAsyncRequest = (request, performRequest, deps) => {
  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useEffect(() => {
    if (!performRequest) {
      return;
    }

    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });

    request()
      .then(result => {
        setFetchState({
          data: result,
          status: requestStates.SUCCESS,
        });
      })
      .catch(err => {
        setFetchState({
          error: err,
          status: requestStates.FAILURE,
        });
      });
  }, [setFetchState, ...deps]);

  return fetchState;
};

export default useAsyncRequest;
