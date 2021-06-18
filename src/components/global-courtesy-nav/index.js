import { NavLink } from 'react-router-dom';
import React from 'react';
import { Icon } from '@equinor/eds-core-react';
import {
  info_circle,
  notifications,
  accessible,
  account_circle,
} from '@equinor/eds-icons';

import externalUrls from '../../externalUrls';
import routes from '../../routes';
import { urlToMonitoring } from '../../utils/monitoring';

import './style.css';

Icon.add({
  info_circle,
  notifications,
  accessible,
  account_circle,
});

export const GlobalCourtesyNav = () => {
  return (
    <nav
      className="global-courtesy-nav"
      role="navigation"
      aria-label="Useful Radix links"
    >
      <NavLink to={routes.about}>
        <Icon name="info_circle" />
      </NavLink>
      <a href={externalUrls.documentation}>
        <Icon name="notifications" />
      </a>
      <a href={externalUrls.community}>
        <Icon name="accessible" />
      </a>
      <a href={urlToMonitoring()}>
        <Icon name="account_circle" />
      </a>
    </nav>
  );
};

export default GlobalCourtesyNav;
