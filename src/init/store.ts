import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
  costStoreApi,
  logStoreApi,
  radixStoreApi,
  scanStoreApi,
} from '../store/configs';

const sagaMw = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [costStoreApi.reducerPath]: costStoreApi.reducer,
    [logStoreApi.reducerPath]: logStoreApi.reducer,
    [radixStoreApi.reducerPath]: radixStoreApi.reducer,
    [scanStoreApi.reducerPath]: scanStoreApi.reducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ serializableCheck: false }),
    costStoreApi.middleware,
    logStoreApi.middleware,
    radixStoreApi.middleware,
    scanStoreApi.middleware,
  ],
  devTools: true,
  enhancers: [applyMiddleware(sagaMw)],
});

const getStore = (): typeof store => {
  return store;
};

export default getStore(); // global store
