import useAsyncRequest from './use-async-request';

const usePutJson = (path, data, performRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(path, 'PUT', dataAsString, performRequest);
};

export default usePutJson;
