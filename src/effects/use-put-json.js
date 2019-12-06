import useAsyncRequest from './use-async-request';

const usePutJson = (path, data, stopRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(path, 'PUT', dataAsString, stopRequest);
};

export default usePutJson;
