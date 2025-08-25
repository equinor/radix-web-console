import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configVariables } from '../../utils/config';
import type { RootState } from '../store';

/** Override for text/plain response handler */
const responseHandler = (response: Response) => {
  const contentType = response.headers.get('content-type');
  return !contentType || contentType.includes('text/plain')
    ? response.text()
    : response.json();
};

export const costStoreApi = createApi({
  reducerPath: 'costApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/cost-api', redirect: 'error' }),
  endpoints: () => ({}),
});

export const logStoreApi = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/log-api',
    responseHandler,
    redirect: 'error',
  }),
  endpoints: () => ({}),
});

export const radixStoreApi = createApi({
  reducerPath: 'radixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    responseHandler,
    redirect: 'error',
  }),
  endpoints: () => ({}),
});

export const scanStoreApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/scan-api', redirect: 'error' }),
  endpoints: () => ({}),
});

export const serviceNowStoreApi = createApi({
  reducerPath: 'serviceNowApi',
  baseQuery: fetchBaseQuery({
    baseUrl: configVariables.SERVICENOW_PROXY_BASEURL,
    redirect: 'error',
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;

      const provider = state.auth.provider;
      if (!provider || !provider.serviceNowAuthProvider) return headers;

      const token = await provider.serviceNowAuthProvider.getAccessToken();
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const msGraphStoreApi = createApi({
  reducerPath: 'msGraphApi',
  baseQuery: fetchBaseQuery({ redirect: 'error' }),
  endpoints: () => ({}),
});

export const uptimeApi = createApi({
  reducerPath: 'uptimeAPi',
  baseQuery: fetchBaseQuery({ baseUrl: '/uptime', redirect: 'error' }),
  endpoints: () => ({}),
});
