import classNames from 'classnames';
import React from 'react';
import { Button, Icon, Card } from '@equinor/eds-core-react';
import { copy as copy_icon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export const Code = ({ copy, wrap, children }) => {
  const handleClick = () => copyToClipboard(children);
  const className = classNames('code', {
    'code--wrap': wrap,
    'code--with-toolbar': copy,
  });

  return (
    <div className={className}>
      {copy && (
        <div className="code__toolbar">
          <Button variant="ghost" color="primary" onClick={handleClick}>
            <Icon data={copy_icon} />
            Copy
          </Button>
        </div>
      )}
      <Card
        className="code__card"
        style={{ boxShadow: tokens.elevation.raised }}
      >
        {children}
      </Card>
    </div>
  );
};

export default Code;
