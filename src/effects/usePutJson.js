import useAsyncRequest from './useAsyncRequest';
import { putJson } from '../api/api-helpers';

const usePutJson = (url, resource, body, performRequest) => {
  const bodyAsString = JSON.stringify(body);
  return useAsyncRequest(() => putJson(url, body, resource), performRequest, [
    url,
    resource,
    bodyAsString,
  ]);
};

export default usePutJson;
