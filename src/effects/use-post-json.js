import useAsyncCallback from './use-async-callback';

const usePostJson = (path, data) => useAsyncCallback(path, 'POST', data);

export default usePostJson;
