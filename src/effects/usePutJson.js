import useAsyncRequest from './useAsyncRequest';
import { putJson } from '../api/api-helpers';

const usePutJson = (url, resource, body, performRequest, deps) => {
  return useAsyncRequest(
    () => putJson(url, body, resource),
    performRequest,
    deps
  );
};

export default usePutJson;
