import React from 'react';
import { Route, Link } from 'react-router-dom';

import GlobalNav from '../global-nav';
import PageAbout from '../page-about';
import PageApplications from '../page-applications';
import PageCreateApplication from '../page-create-application';
import routes from '../../routes';

import './style.css';

export default () => (
  <div>
    <GlobalNav />
    <h1 className="o-heading-page">Radix Web Console</h1>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={routes.about}>About</Link>
        </li>
        <li>
          <Link to={routes.apps}>Applications</Link>
        </li>
        <li>
          <Link to={routes.authLogout}>Log out</Link>
        </li>
      </ul>

      <hr />

      <Route path={routes.about} component={PageAbout} />
      <Route path={routes.apps} component={PageApplications} exact />
      <Route path={routes.appCreate} component={PageCreateApplication} />
    </div>
  </div>
);
