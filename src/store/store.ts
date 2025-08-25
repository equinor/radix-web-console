import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  costStoreApi,
  logStoreApi,
  msGraphStoreApi,
  radixStoreApi,
  scanStoreApi,
  serviceNowStoreApi,
  uptimeApi,
} from '../store/configs';
import authReducer from '../store/msal/reducer';

const store = configureStore({
  reducer: {
    [costStoreApi.reducerPath]: costStoreApi.reducer,
    [logStoreApi.reducerPath]: logStoreApi.reducer,
    [radixStoreApi.reducerPath]: radixStoreApi.reducer,
    [scanStoreApi.reducerPath]: scanStoreApi.reducer,
    [serviceNowStoreApi.reducerPath]: serviceNowStoreApi.reducer,
    [msGraphStoreApi.reducerPath]: msGraphStoreApi.reducer,
    [uptimeApi.reducerPath]: uptimeApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      costStoreApi.middleware,
      logStoreApi.middleware,
      radixStoreApi.middleware,
      scanStoreApi.middleware,
      serviceNowStoreApi.middleware,
      msGraphStoreApi.middleware,
      uptimeApi.middleware
    ),
  devTools: true,
});

const getStore = (): typeof store => {
  return store;
};
setupListeners(store.dispatch);
export default getStore(); // global store

export type RootStore = typeof store;
export type RootState = ReturnType<RootStore['getState']>;
