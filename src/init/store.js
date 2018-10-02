import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import rootReducer from '../state/root-reducer';
import rootSaga from '../state/root-saga';

const history = createHistory();
const routerMw = routerMiddleware(history);
const sagaMw = createSagaMiddleware();

let composeWithDevTools = compose;

if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    maxAge: 500,
  });
}

const reducers = combineReducers({ ...rootReducer, router: routerReducer });

const makeStore = (startSagas = true) => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(routerMw, sagaMw))
  );
  if (startSagas) {
    sagaMw.run(rootSaga);
  }
  return store;
};

export { history, makeStore };
export default makeStore(); // global store
