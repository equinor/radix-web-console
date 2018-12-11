import React from 'react';

import Alert from '.';

export default (
  <div>
    <Alert>A simple alert</Alert>
    <Alert type="info">Still a simple alert</Alert>
    <Alert type="info">
      A simple alert with a <a href="/">link with descenders aja aqa apa aga</a>
    </Alert>
    <Alert type="warning">A warning alert</Alert>
    <Alert type="warning">
      A warning alert with a <a href="/">link</a>
    </Alert>
    <Alert type="danger">A danger alert</Alert>
    <Alert type="danger">
      A danger alert with a <a href="/">link</a>
    </Alert>
  </div>
);
