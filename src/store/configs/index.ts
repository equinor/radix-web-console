import { ResponseHandler } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** Override for text/plain response handler */
const responseHandler: ResponseHandler = (response) => {
  return response.headers.get('content-type').includes('text/plain')
    ? response.text()
    : response.json();
};

export const costStoreApi = createApi({
  reducerPath: 'costApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/cost-api' }),
  endpoints: () => ({}),
});

export const logStoreApi = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/log-api', responseHandler }),
  endpoints: () => ({}),
});

export const radixStoreApi = createApi({
  reducerPath: 'radixApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1', responseHandler }),
  endpoints: () => ({}),
});

export const scanStoreApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/scan-api' }),
  endpoints: () => ({}),
});
