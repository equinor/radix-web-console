import { faLayerGroup, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import React from 'react';

import routes from '../../routes';
import './style.css';

export const GlobalNav = () => {
  return (
    <nav className="global-nav" role="navigation" aria-label="Application">
      <NavLink title="All applications" to={routes.apps}>
        <span className="global-nav__icon">
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
        <span className="global-nav__text">All applications</span>
      </NavLink>
      <NavLink title="Create application" to={routes.appCreate}>
        <span className="global-nav__icon">
          <FontAwesomeIcon icon={faPlusCircle} />
        </span>
        <span className="global-nav__text">Create application</span>
      </NavLink>
    </nav>
  );
};

export default GlobalNav;
