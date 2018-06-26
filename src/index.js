import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

//import registerServiceWorker from './init/register-service-worker';
import store, { history } from './init/store';
import AuthWrapper from './components/auth-wrapper';
import App from './components/app';
import routes from './routes';

import './style.css';

let content;
const testPathMatch = window.location.pathname.match(
  RegExp(routes.testComponent)
);

if (testPathMatch) {
  content = require(`./components/${testPathMatch[1]}/test-ui`).default;
} else {
  content = (
    <AuthWrapper>
      <App />
    </AuthWrapper>
  );
}

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>{content}</ConnectedRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
//registerServiceWorker();
