import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../state/root-reducer';
import { rootSaga } from '../state/root-saga';
import { emptySplitApi } from '../store/emptyApi';

const sagaMw = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (dmw) =>
    dmw({ serializableCheck: false }).concat(emptySplitApi.middleware),
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
