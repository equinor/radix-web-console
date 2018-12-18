import React from 'react';
import { GlobalTitle } from './index';

export default (
  <div
    style={{
      width: 400,
      margin: 'auto',
      marginTop: 50,
      gridGap: 10,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <GlobalTitle title="radix-canary-golang" />
    <GlobalTitle title="Applications" />
    <GlobalTitle title="radix-very-long-application-name-testing-something-like-this" />
  </div>
);
