import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../state/root-reducer';
import { rootSaga } from '../state/root-saga';
import {
  costStoreApi,
  logStoreApi,
  radixStoreApi,
  scanStoreApi,
} from '../store/configs';

const sagaMw = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducer,
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

const getStore = (startSagas = true): typeof store => {
  if (startSagas) {
    sagaMw.run(rootSaga);
  }
  return store;
};

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export { getStore };
export type { AppDispatch, RootState };
export default getStore(); // global store
