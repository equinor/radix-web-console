import React from 'react';

import { Chip } from '.';

export default (
  <div>
    <p>
      Inline text before <Chip type="info">Info</Chip> and in the middle{' '}
      <Chip type="warning">Warning</Chip> <Chip type="danger">Danger</Chip>{' '}
      <Chip>Default</Chip> and at the end.
    </p>
  </div>
);
