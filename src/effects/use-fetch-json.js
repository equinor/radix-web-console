import useAsyncRequest from './use-async-request';

const useFetchJson = path => {
  return useAsyncRequest(path, 'GET');
};

export default useFetchJson;
