import useAsyncRequest from './use-async-request';
import { fetchJsonNew } from '../api/api-helpers';

const usePutJson = (path, data, stopRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(fetchJsonNew, path, 'PUT', dataAsString, stopRequest);
};

export default usePutJson;
