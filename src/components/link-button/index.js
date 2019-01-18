import React from 'react';
import classNames from 'classnames';

import './style.css';

const LinkButton = ({ to, linkBtnType = 'default', children, ...props }) => {
  const names = Array.isArray(linkBtnType) ? linkBtnType : [linkBtnType];
  const className = classNames(
    'link-btn',
    names.map(name => `link-btn--${name}`)
  );

  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );
};

export default LinkButton;
