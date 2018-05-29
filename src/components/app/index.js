import React from 'react';
import { Provider } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './bootstrap/store';
import PageAbout from './components/page-about';

import './app.css';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route path="/about" component={PageAbout} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
