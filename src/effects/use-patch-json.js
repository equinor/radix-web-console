import useAsyncCallback from './use-async-callback';

const usePatchJson = (path, data) => useAsyncCallback(path, 'PATCH', data);

export default usePatchJson;
