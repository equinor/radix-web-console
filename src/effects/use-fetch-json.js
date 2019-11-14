import useAsyncRequest from './use-async-request';
import { getJson } from '../api/api-helpers';

const useFetchJson = (url, resource) => {
  return useAsyncRequest(() => getJson(url, resource), true, [url, resource]);
};

export default useFetchJson;
