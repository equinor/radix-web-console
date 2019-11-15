import useAsyncRequest from './use-async-request';

const useFetchJson = (path, resource) => {
  return useAsyncRequest(path, 'GET', resource);
};

export default useFetchJson;
