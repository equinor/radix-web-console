import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import './style.css';

const LinkButton = ({ to, linkBtnType = 'default', children, ...props }) => {
  const names = Array.isArray(linkBtnType) ? linkBtnType : [linkBtnType];
  const className = classNames(
    'link-btn',
    names.map(name => `link-btn--${name}`)
  );

  return (
    <NavLink to={to} className={className} {...props}>
      {children}
    </NavLink>
  );
};

export default LinkButton;
