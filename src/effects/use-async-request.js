import { useState } from 'react';
import { fetchJsonNew } from '../api/api-helpers';
import requestStates from '../state/state-utils/request-states';

const useAsyncRequest = (
  path,
  method,
  processRequestData = (data) => data,
  processResponseData = (result) => result
) => {
  const [fetchState, setFetchState] = useState({
    data: null,
    error: null,
    status: requestStates.IDLE,
  });

  const apiCall = (data) => {
    const dataAsString = JSON.stringify(processRequestData(data));
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IN_PROGRESS,
    });
    fetchJsonNew(path, method, dataAsString)
      .then((result) => {
        setFetchState({
          data: processResponseData(result),
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

  const resetState = () =>
    setFetchState({
      data: null,
      error: null,
      status: requestStates.IDLE,
    });

  return [fetchState, apiCall, resetState];
};

export default useAsyncRequest;
