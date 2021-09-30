import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../state/root-reducer';
import rootSaga from '../state/root-saga';

const history = createBrowserHistory();
const routerMw = routerMiddleware(history);
const sagaMw = createSagaMiddleware();

const reducers = combineReducers({
  ...rootReducer,
  router: connectRouter(history),
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMw, sagaMw))
);

const getStore = (startSagas = true): typeof store => {
  if (startSagas) {
    sagaMw.run(rootSaga);
  }
  return store;
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { history, getStore };
export type { AppDispatch, RootState };
export default getStore(); // global store
