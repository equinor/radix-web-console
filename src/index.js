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
  RegExp(`^${routes.devComponent}`)
);

if (testPathMatch) {
  // If the URL matches `routes.devComponent`, we render *only* the content of
  // the `dev.js` file for the specified component. Useful for
  // debugging/development

  const component = testPathMatch[1];

  try {
    content = require(`./components/${component}/dev`).default;
  } catch (e) {
    content = (
      <p>The file "dev.js" does not exist for the component "{component}".</p>
    );
  }
} else {
  // Just a normal, sunny URL. Render the app!

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
