import { ResponseHandler } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

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
    baseUrl:
      'https://api-radix-servicenow-proxy-prod.radix.equinor.com/api/v1/',
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;

      const provider = state.auth.provider;
      if (!provider) return headers;

      const token = await provider.serviceNowAuthProvider.getAccessToken();
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const msGraphStoreApi = createApi({
  reducerPath: 'msGrapApi',
  baseQuery: fetchBaseQuery(),
  endpoints: () => ({}),
});

export const dynatraceStoreApi = createApi({
  reducerPath: 'dynatraceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/uptime-api' }),
  endpoints: () => ({}),
});
