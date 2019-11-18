import useAsyncRequest from './use-async-request';

const usePutJson = (path, resource, data, performRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(path, 'PUT', resource, dataAsString, performRequest);
};

export default usePutJson;
