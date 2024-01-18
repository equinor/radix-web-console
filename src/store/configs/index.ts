import { ResponseHandler } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {
  createApi,
  fetchBaseQuery,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../../init/store';

/** Override for text/plain response handler */
const responseHandler: ResponseHandler = (response) => {
  const contentType = response.headers.get('content-type');
  return !contentType || contentType.includes('text/plain')
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

export const serviceNowStoreApi = createApi({
  reducerPath: 'serviceNowApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, api) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const msGraphStoreApi = createApi({
  reducerPath: 'msGrapApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: async (headers, { getState }) => {
      const store: RootState = getState();
      return headers;
    },
  }),
  endpoints: () => ({}),
});
