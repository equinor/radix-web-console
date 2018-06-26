import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';
import banner from './banner.svg';
import './style.css';

export const GlobalNav = ({ match }) => (
  <nav className="global-nav">
    <div className="o-layout-container">
      <div className="global-nav__container">
        <NavLink to={routes.home} className="global-nav__banner">
          <img
            className="global-nav__banner-img"
            src={banner}
            alt="Omnia Radix web console"
          />
        </NavLink>
        <ul className="global-nav__menu">
          <li>
            <NavLink to={routes.apps} activeClassName="active">
              Applications
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.authLogout}>Log out</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(GlobalNav);
