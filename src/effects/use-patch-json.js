import useAsyncRequest from './use-async-request';
import { fetchJsonNew } from '../api/api-helpers';

const usePatchJson = (path, data, stopRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(
    fetchJsonNew,
    path,
    'PATCH',
    dataAsString,
    stopRequest
  );
};

export default usePatchJson;
