import useAsyncRequest from './use-async-request';

const usePutJson = (path, resource, data, stopRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(path, 'PUT', resource, dataAsString, stopRequest);
};

export default usePutJson;
