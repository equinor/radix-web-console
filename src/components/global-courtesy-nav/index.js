import { NavLink } from 'react-router-dom';
import React from 'react';

import routes from '../../routes';

import './style.css';

export const GlobalCourtesyNav = () => {
  return (
    <nav
      className="global-courtesy-nav"
      role="navigation"
      aria-label="Useful Radix links"
    >
      <NavLink to={routes.about}>About</NavLink>
      <a href="https://www.dev.radix.equinor.com/documentation.html">
        Documentation
      </a>
      <a href="https://www.dev.radix.equinor.com/community.html">Community</a>
    </nav>
  );
};

export default GlobalCourtesyNav;
