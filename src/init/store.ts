import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../state/root-reducer';
import { rootSaga } from '../state/root-saga';

const history = createBrowserHistory();
const sagaMw = createSagaMiddleware();

const store = configureStore({
  reducer: { ...rootReducer, router: connectRouter(history) },
  middleware: (dmw) => dmw({ serializableCheck: false }),
  devTools: true,
  enhancers: [applyMiddleware(routerMiddleware(history), sagaMw)],
});

const getStore = (startSagas = true): typeof store => {
  if (startSagas) {
    sagaMw.run(rootSaga);
  }
  return store;
};

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export { history, getStore };
export type { AppDispatch, RootState };
export default getStore(); // global store
