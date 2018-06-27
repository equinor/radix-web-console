import React from 'react';
import classNames from 'classnames';

import './style.css';

const Button = ({ btnType = 'default', children, ...props }) => {
  const names = Array.isArray(btnType) ? btnType : [btnType];
  const className = classNames('btn', names.map(name => `btn--${name}`));

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
