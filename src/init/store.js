import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../state/root-reducer';
import rootSaga from '../state/root-saga';
import rootEpic from '../state/root-epics';

const history = createBrowserHistory();
const routerMw = routerMiddleware(history);
const sagaMw = createSagaMiddleware();

let composeWithDevTools = compose;

if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    maxAge: 500,
  });
}

const reducers = combineReducers({
  ...rootReducer,
  router: connectRouter(history),
});

const epicMiddleware = createEpicMiddleware();

const makeStore = (startSagas = true) => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(routerMw, sagaMw, epicMiddleware))
  );
  if (startSagas) {
    sagaMw.run(rootSaga);
  }
  epicMiddleware.run(rootEpic);
  return store;
};

export { history, makeStore };
export default makeStore(); // global store
