import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const costApi = createApi({
  reducerPath: 'costApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/cost-api' }),
  endpoints: () => ({}),
});

export const scanApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/scan-api' }),
  endpoints: () => ({}),
});

export default [costApi, scanApi];
