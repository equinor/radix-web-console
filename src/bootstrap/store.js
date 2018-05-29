import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from '../state';

const history = createHistory();
const routerMw = routerMiddleware(history);
const sagaMw = createSagaMiddleware();

let composeWithDevTools = compose;

if (window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
  });
}

const reducers = { ...rootReducer, router: routerReducer };

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMw, sagaMw))
);

export { history };
export default store;
