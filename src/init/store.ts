import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  costStoreApi,
  logStoreApi,
  radixStoreApi,
  scanStoreApi,
} from '../store/configs';

const store = configureStore({
  reducer: {
    [costStoreApi.reducerPath]: costStoreApi.reducer,
    [logStoreApi.reducerPath]: logStoreApi.reducer,
    [radixStoreApi.reducerPath]: radixStoreApi.reducer,
    [scanStoreApi.reducerPath]: scanStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      costStoreApi.middleware,
      logStoreApi.middleware,
      radixStoreApi.middleware,
      scanStoreApi.middleware
    ),
  devTools: true,
});

const getStore = (): typeof store => {
  return store;
};
setupListeners(store.dispatch);
export default getStore(); // global store
