import React from 'react';
import classNames from 'classnames';

import './style.css';

const Button = ({ btnType = 'default', children, ...props }) => {
  const className = classNames({
    btn: true,
    [`btn--${btnType}`]: true,
  });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
