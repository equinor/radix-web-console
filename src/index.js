import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './bootstrap/register-service-worker';
import store, { history } from './bootstrap/store';
import App from './components/app';

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
