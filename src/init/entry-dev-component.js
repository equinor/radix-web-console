import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import React from 'react';

import routes from '../routes';
import store, { history } from './store';

const testPathMatch = window.location.pathname.match(
  RegExp(`^${routes.devComponent}`)
);

const component = testPathMatch[1];
let content;

try {
  content = require(`../components/${component}/dev`).default;
} catch (e) {
  content = (
    <p>
      The file "dev.js" does not exist for the component{' '}
      <strong>{component}</strong>.
    </p>
  );
}

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>{content}</ConnectedRouter>
  </Provider>
);
