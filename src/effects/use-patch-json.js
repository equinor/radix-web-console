import useAsyncRequest from './use-async-request';

const usePatchJson = (path, data, stopRequest) => {
  const dataAsString = JSON.stringify(data);
  return useAsyncRequest(path, 'PATCH', dataAsString, stopRequest);
};

export default usePatchJson;
