import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';

import App from '../components/app';
import AuthWrapper from '../components/auth-wrapper';
import store, { history } from './store';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </ConnectedRouter>
  </Provider>
);
