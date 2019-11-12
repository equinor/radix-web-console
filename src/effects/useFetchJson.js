import { useEffect, useState } from 'react';
import { getJson } from '../api/api-helpers';

import requestStates from '../state/state-utils/request-states';

const useFetchJson = (url, resource) => {
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

    getJson(url, resource)
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
  }, [url, resource]);

  return fetchState;
};

export default useFetchJson;
