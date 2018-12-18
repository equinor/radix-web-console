import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const GlobalCourtesyNavLink = ({ label, to }) => (
  <NavLink to={to} className="global-courtesy-nav__link">
    {label}
  </NavLink>
);

export const GlobalCourtesyNav = () => {
  return (
    <nav
      className="global-courtesy-nav"
      role="navigation"
      aria-label="Useful Radix links"
    >
      <GlobalCourtesyNavLink to="/documentation" label="Documentation" />
      <GlobalCourtesyNavLink to="/community" label="Community" />
    </nav>
  );
};
