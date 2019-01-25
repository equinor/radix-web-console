import React from 'react';

import { Chip, progressStatusToChipType } from '.';

export default (
  <div>
    <p>
      Inline text before <Chip type="info">Info</Chip> and in the middle{' '}
      <Chip type="warning">Warning</Chip> <Chip type="danger">Danger</Chip>{' '}
      <Chip>Default</Chip> and at the end.
    </p>
    <Chip type={progressStatusToChipType('Pending')}>Pending</Chip>
    <Chip type={progressStatusToChipType('Running')}>Running</Chip>
    <Chip type={progressStatusToChipType('Failed')}>Failed</Chip>
    <Chip type={progressStatusToChipType('Succeeded')}>Succeeded</Chip>
  </div>
);
