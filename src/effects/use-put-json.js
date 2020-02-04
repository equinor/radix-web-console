import useAsyncCallback from './use-async-callback';

const usePutJson = (path, data) => useAsyncCallback(path, 'PUT', data);

export default usePutJson;
