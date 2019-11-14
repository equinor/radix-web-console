import { useEffect, useState } from 'react';
import { fetchJsonNew } from '../api/api-helpers';

import requestStates from '../state/state-utils/request-states';

const useAsyncRequest = (path, method, resource, data, stopRequest) => {
  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  useEffect(() => {
    if (stopRequest) {
      return;
    }

    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });
    try {
      fetchJsonNew(path, method, resource, data).then(result => {
        setFetchState({
          data: result,
          status: requestStates.SUCCESS,
        });
      });
    } catch (err) {
      setFetchState({
        error: err,
        status: requestStates.FAILURE,
      });
    }
  }, [setFetchState, stopRequest, path, method, resource, data]);

  return fetchState;
};

export default useAsyncRequest;
