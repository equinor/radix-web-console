import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

//import registerServiceWorker from './init/register-service-worker';
import store, { history } from './init/store';
import AuthWrapper from './components/auth-wrapper';
import App from './components/app';

import './style.css';

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
//registerServiceWorker();
