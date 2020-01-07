import useAsyncRequest from './use-async-request';
import { fetchJsonNew } from '../api/api-helpers';

const useFetchJson = path => {
  return useAsyncRequest(fetchJsonNew, path, 'GET');
};

export default useFetchJson;
