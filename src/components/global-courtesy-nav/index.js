import { NavLink } from 'react-router-dom';
import React from 'react';

import externalUrls from '../../externalUrls';
import routes from '../../routes';
import { urlToMonitoring } from '../../utils/monitoring';

import './style.css';

export const GlobalCourtesyNav = () => {
  return (
    <nav
      className="global-courtesy-nav"
      role="navigation"
      aria-label="Useful Radix links"
    >
      <NavLink to={routes.about}>About</NavLink>
      <a href={externalUrls.documentation}>Documentation</a>
      <a href={externalUrls.community}>Community</a>
      <a href={urlToMonitoring()}>Monitoring</a>
    </nav>
  );
};

export default GlobalCourtesyNav;
