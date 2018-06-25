import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import routes from '../../routes';
import './style.css';

export const GlobalNav = ({ match }) => (
  <nav className="global-nav">
    <Link to={routes.home}>
      Logo
    </Link>
  </nav>
);

export default withRouter(GlobalNav);
