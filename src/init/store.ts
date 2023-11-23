import {
  Middleware,
  Reducer,
  applyMiddleware,
  configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../state/root-reducer';
import { rootSaga } from '../state/root-saga';
import apis from '../store/configs';

const apiRecord = apis.reduce<{
  reducers: Record<string, Reducer>;
  middlewares: Array<Middleware>;
}>(
  (obj, { reducerPath, reducer, middleware }) => {
    obj.reducers[reducerPath] = reducer;
    obj.middlewares.push(middleware);
    return obj;
  },
  { reducers: {}, middlewares: [] }
);

const sagaMw = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducer,
    ...apiRecord.reducers,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ serializableCheck: false }),
    ...apiRecord.middlewares,
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
