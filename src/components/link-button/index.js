import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

// NB: This component is intended as a "subclassing" of ../button
//     As such, it shares the classnames and stylesheet from that component

import '../button/style.css';

const externalRegEx = /^[a-z][a-z0-9.+-]*:/i;

const LinkButton = ({ to, btnType = 'default', children, ...props }) => {
  const names = Array.isArray(btnType) ? btnType : [btnType];
  const className = classNames('btn', names.map(name => `btn--${name}`));

  if (externalRegEx.test(to)) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NavLink to={to} className={className} {...props}>
      {children}
    </NavLink>
  );
};

export default LinkButton;
