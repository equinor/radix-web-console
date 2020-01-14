import { useCallback, useState } from 'react';
import { fetchJsonNew } from '../api/api-helpers';
import requestStates from '../state/state-utils/request-states';

const usePostJson = (path, data) => {
  const dataAsString = JSON.stringify(data);

  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  const apiCall = useCallback(() => {
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });
    fetchJsonNew(path, 'POST', dataAsString)
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
  }, [setFetchState, path, dataAsString]);

  const resetState = () =>
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IDLE,
    });

  return [fetchState, resetState, apiCall];
};

export default usePostJson;
