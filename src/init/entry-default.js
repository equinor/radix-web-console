import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';

import PageRoot from '../components/page-root';
import store, { history } from './store';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageRoot />
    </ConnectedRouter>
  </Provider>
);
