import { ResponseHandler } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** Override for text/plain response handler */
const responseHandler: ResponseHandler = (response) => {
  return response.headers.get('content-type').includes('text/plain')
    ? response.text()
    : response.json();
};

export const costApi = createApi({
  reducerPath: 'costApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/cost-api' }),
  endpoints: () => ({}),
});

export const logApi = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/log-api', responseHandler }),
  endpoints: () => ({}),
});

export const scanApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/scan-api' }),
  endpoints: () => ({}),
});

export default [costApi, logApi, scanApi];
