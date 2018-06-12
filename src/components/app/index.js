import React from 'react';
import { Route, Link } from 'react-router-dom';

import PageAbout from '../page-about';
import PageCounters from '../page-counters';
import routes from '../../routes';

import './style.css';

export default () => (
  <div>
    <h1 className="o-heading-page">Radix Web Console</h1>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/counters">Counters</Link>
        </li>
        <li>
          <Link to={routes.authLogout}>Log out</Link>
        </li>
      </ul>

      <hr />

      <Route path="/about" component={PageAbout} />
      <Route path="/counters" component={PageCounters} />
    </div>
  </div>
);
