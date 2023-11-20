import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const costApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/cost-api' }),
  endpoints: () => ({}),
});

export default [costApi];
