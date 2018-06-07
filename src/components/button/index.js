import React from 'react';
import classNames from 'classnames';

import './style.css';

const Button = ({ type = 'default', children, ...props }) => {
  const className = classNames({
    btn: true,
    [`btn--${type}`]: true,
  });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
